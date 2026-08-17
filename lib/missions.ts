import { readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { getProfessionalTitle } from "@/lib/mission-titles";
export { MISSION_SLUGS } from "@/lib/mission-slugs";
export type { MissionSlug, MissionImage } from "@/lib/mission-slugs";
import type { MissionSlug, MissionImage } from "@/lib/mission-slugs";

const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

function toTitle(filename: string): string {
  return filename
    .replace(IMAGE_EXT, "")
    .replace(/_+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function getMissionImages(slug: MissionSlug, locale: string = "fr"): MissionImage[] {
  const dir = path.join(process.cwd(), "public", "images", "missions", slug);
  if (!existsSync(dir)) return [];

  return readdirSync(dir)
    .filter((f) => IMAGE_EXT.test(f))
    .map((f) => ({
      src: `/images/missions/${slug}/${encodeURI(f)}`,
      title: getProfessionalTitle(slug, f, locale) ?? toTitle(f),
    }));
}