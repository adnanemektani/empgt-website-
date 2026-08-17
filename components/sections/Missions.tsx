import { getLocale, getTranslations } from "next-intl/server";
import { getMissionImages, MISSION_SLUGS, type MissionImage } from "@/lib/missions";
import MissionsContent from "@/components/sections/MissionsContent";

export default async function Missions() {
  const t = await getTranslations("Missions");
  const locale = await getLocale();
  const sections = t.raw("sections") as { title: string; description: string }[];

  const fallback: MissionImage[][] = MISSION_SLUGS.map((slug) =>
    getMissionImages(slug, locale)
  );

  return <MissionsContent sections={sections} fallback={fallback} />;
}