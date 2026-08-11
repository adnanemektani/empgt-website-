import { readdirSync, existsSync } from "node:fs";
import path from "node:path";

export const MISSION_SLUGS = [
  "bureaux-neufs",
  "laboratoires",
  "gares-ferroviaires",
  "renovation-bureaux",
  "campus-universitaires",
  "industries",
  "autres",
] as const;

export type MissionSlug = (typeof MISSION_SLUGS)[number];

const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

function toTitle(filename: string): string {
  return filename
    .replace(IMAGE_EXT, "")
    .replace(/_+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export type MissionImage = { src: string; title: string };

export function getMissionImages(slug: MissionSlug): MissionImage[] {
  const dir = path.join(process.cwd(), "public", "images", "missions", slug);
  if (!existsSync(dir)) return [];

  return readdirSync(dir)
    .filter((f) => IMAGE_EXT.test(f))
    .map((f) => ({ src: `/images/missions/${slug}/${encodeURI(f)}`, title: toTitle(f) }));
}