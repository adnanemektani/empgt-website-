import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getMissionImages, MISSION_SLUGS } from "@/lib/missions";

export default async function Missions() {
  const t = await getTranslations("Missions");
  const sections = t.raw("sections") as { title: string; description: string }[];

  return (
    <>
      {sections.map((section, i) => {
        const slug = MISSION_SLUGS[i];
        const images = getMissionImages(slug);
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
                <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                  {images.map((img) => (
                    <figure
                      key={img.src}
                      className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10"
                    >
                      <Image
                        src={img.src}
                        alt={img.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-3 pb-2.5 pt-10 opacity-0 backdrop-blur-[1px] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="truncate text-sm font-semibold text-white">
                          {img.title}
                        </p>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        );
      })}
    </>
  );
}