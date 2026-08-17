import { createClient } from "@sanity/client";
import { createReadStream, existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GOOGLE_SHEET_CSV_URL, parseNewsCsv, youtubeThumb } from "../../lib/news.ts";
import { getProfessionalTitles } from "../../lib/mission-titles.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..", "..");

const projectId = process.env.SANITY_PROJECT_ID || "wwzbgktd";
const dataset = process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_TOKEN;

if (!token) {
  console.error("Missing SANITY_TOKEN (write access). Set it before running.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const MISSION_SLUGS = [
  "bureaux-neufs",
  "laboratoires",
  "gares-ferroviaires",
  "renovation-bureaux",
  "campus-universitaires",
  "industries",
  "autres",
];

const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

const LOCALES = ["fr", "en", "ar", "zh", "pt"];

function toTitle(filename) {
  return filename
    .replace(IMAGE_EXT, "")
    .replace(/_+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function loadSectionNames() {
  const names = {};
  for (const locale of LOCALES) {
    const file = path.join(root, "messages", `${locale}.json`);
    const data = JSON.parse(readFileUtf8(file));
    names[locale] = data.Missions.sections.map((s) => s.title);
  }
  return names;
}

function readFileUtf8(file) {
  return new TextDecoder("utf-8").decode(
    new Uint8Array(readFileSync(file))
  );
}

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

async function uploadImage(filePath, filename) {
  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename,
  });
  return asset._id;
}

async function migrateMissions() {
  const names = loadSectionNames();

  for (let i = 0; i < MISSION_SLUGS.length; i++) {
    const slug = MISSION_SLUGS[i];
    const dir = path.join(root, "public", "images", "missions", slug);
    if (!existsSync(dir)) {
      console.warn(`  ! no folder for ${slug}`);
      continue;
    }

    const files = readdirSync(dir)
      .filter((f) => IMAGE_EXT.test(f))
      .sort();

    const photos = [];
    for (const file of files) {
      const filePath = path.join(dir, file);
      const pro = getProfessionalTitles(file);
      const baseTitle = pro ? pro.fr : toTitle(file);
      const title = {
        fr: pro ? pro.fr : baseTitle,
        en: pro ? pro.en : baseTitle,
        ar: pro ? pro.ar : baseTitle,
        zh: pro ? pro.zh : baseTitle,
        pt: pro ? pro.pt : baseTitle,
      };

      const assetId = await uploadImage(filePath, file);
      photos.push({
        _key: slugify(file),
        title,
        image: {
          _type: "image",
          asset: { _type: "reference", _ref: assetId },
          hotspot: { x: 0.5, y: 0.5, height: 1, width: 1 },
          alt: baseTitle,
        },
      });
      console.log(`  + ${file} -> ${assetId}`);
    }

    const doc = {
      _type: "missionSection",
      _id: `missionSection-${slug}`,
      name: { fr: names.fr[i], en: names.en[i], ar: names.ar[i], zh: names.zh[i], pt: names.pt[i] },
      slug: { _type: "slug", current: slug },
      order: i + 1,
      photos,
    };

    await client.createOrReplace(doc);
    console.log(`Saved missionSection-${slug} with ${photos.length} photos`);
  }
}

async function migrateNews() {
  console.log("Fetching news CSV…");
  const res = await fetch(GOOGLE_SHEET_CSV_URL);
  const text = await res.text();
  const rows = parseNewsCsv(text);
  console.log(`Parsed ${rows.length} news rows`);

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const titles = {
      fr: row.titles.FR ?? "",
      en: row.titles.EN ?? "",
      ar: row.titles.AR ?? "",
      zh: row.titles.ZH ?? "",
      pt: row.titles.PT ?? "",
    };
    const externalImage = row.image || youtubeThumb(row.href) || "";

    const date = parseDate(row.date);

    const doc = {
      _type: "news",
      _id: `news-${i}`,
      titles,
      slug: { _type: "slug", current: slugify(titles.fr) || `news-${i}` },
      date: date ? date.toISOString() : undefined,
      source: row.source,
      href: row.href,
      externalImage: externalImage || undefined,
      order: i + 1,
    };

    await client.createOrReplace(doc);
    console.log(`  news-${i}: ${titles.fr}`);
  }
}

function parseDate(value) {
  if (!value) return null;
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})/.exec(value.trim());
  if (!m) {
    const d = new Date(value.trim());
    return isNaN(d.getTime()) ? null : d;
  }
  return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
}

async function main() {
  console.log(`Migrating to ${projectId}/${dataset}`);
  await migrateMissions();
  await migrateNews();
  console.log("Migration complete ✓");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
