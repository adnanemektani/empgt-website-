"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { fetchSanityMissions, type SanityMission } from "@/lib/sanity";
import { MISSION_SLUGS, type MissionImage } from "@/lib/mission-slugs";
import MissionGallery from "@/components/sections/MissionGallery";

type Section = { title: string; description: string };

type Props = {
  sections: Section[];
  fallback: MissionImage[][];
};

export default function MissionsContent({ sections, fallback }: Props) {
  const locale = useLocale();
  const [sanity, setSanity] = useState<SanityMission[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchSanityMissions(locale)
      .then((items) => {
        if (!cancelled) setSanity(items);
      })
      .catch(() => {
        if (!cancelled) setSanity(null);
      });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  return (
    <>
      {sections.map((section, i) => {
        const slug = MISSION_SLUGS[i];
        const even = i % 2 === 0;

        const remote = sanity?.find((m) => m.slug === slug);
        const images =
          remote && remote.photos.length > 0 ? remote.photos : fallback[i] ?? [];

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