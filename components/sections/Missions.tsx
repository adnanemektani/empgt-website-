import { getLocale, getTranslations } from "next-intl/server";
import { getMissionImages, MISSION_SLUGS } from "@/lib/missions";
import MissionGallery from "@/components/sections/MissionGallery";

export default async function Missions() {
  const t = await getTranslations("Missions");
  const locale = await getLocale();
  const sections = t.raw("sections") as { title: string; description: string }[];

  return (
    <>
      {sections.map((section, i) => {
        const slug = MISSION_SLUGS[i];
        const images = getMissionImages(slug, locale);
        const even = i % 2 === 0;

        return (
          <section
            key={slug}
            className={`relative overflow-hidden py-20 lg:py-24 ${
              even ? "bg-background" : "bg-surface"
            }`}
          >
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <div className="flex items-start gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-lg font-bold tracking-tight text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {section.title}
                  </h2>
                  {section.description && (
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {section.description}
                    </p>
                  )}
                </div>
              </div>

              {images.length > 0 ? (
                <MissionGallery images={images} />
              ) : null}
            </div>
          </section>
        );
      })}
    </>
  );
}