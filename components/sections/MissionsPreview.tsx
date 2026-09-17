import { getLocale, getTranslations } from "next-intl/server";
import { getMissionImages, MISSION_SLUGS } from "@/lib/missions";
import MissionsPreviewTrack from "@/components/sections/MissionsPreviewTrack";

export default async function MissionsPreview() {
  const t = await getTranslations("Missions");
  const locale = await getLocale();
  const sections = t.raw("sections") as { title: string; description: string }[];

  const cards = MISSION_SLUGS.map((slug, i) => ({
    slug,
    title: sections[i].title,
    description: sections[i].description,
    images: getMissionImages(slug, locale),
  })).filter((card) => card.images.length > 0);

  if (cards.length === 0) return null;

  return (
    <MissionsPreviewTrack
      cards={cards}
      badge={t("previewBadge")}
      title={t("previewTitle")}
      subtitle={t("previewSubtitle")}
      hint={t("previewHint")}
      cta={t("previewCta")}
    />
  );
}
