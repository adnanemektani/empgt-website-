"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Search } from "lucide-react";
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
  const t = useTranslations("Missions");
  const [sanity, setSanity] = useState<SanityMission[] | null>(null);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<number | null>(null);

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

  const applySearch = () => setQuery(draft.trim());

  const normalized = query.toLowerCase();
  const isFiltering = normalized.length > 0 || active !== null;

  const sectionsData = useMemo(
    () =>
      sections.map((section, i) => {
        const slug = MISSION_SLUGS[i];
        const remote = sanity?.find((m) => m.slug === slug);
        const images =
          remote && remote.photos.length > 0 ? remote.photos : fallback[i] ?? [];
        return { index: i, slug, section, images };
      }),
    [sections, sanity, fallback]
  );

  const visible = useMemo(
    () =>
      active === null
        ? sectionsData
        : sectionsData.filter((s) => s.index === active),
    [sectionsData, active]
  );

  const results = useMemo(() => {
    if (!normalized) {
      return visible.map((s) => ({ ...s, images: s.images }));
    }
    return visible.map((s) => ({
      ...s,
      images: s.images.filter((img) =>
        img.title.toLowerCase().includes(normalized)
      ),
    }));
  }, [visible, normalized]);

  const totalFound = results.reduce((sum, s) => sum + s.images.length, 0);

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm lg:p-8">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative block flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") applySearch();
                }}
                aria-label={t("searchPlaceholder")}
                className="w-full rounded-2xl border border-border bg-background py-3.5 pl-12 pr-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              {draft === "" && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-12 right-4 top-1/2 flex -translate-y-1/2 items-center overflow-hidden text-sm text-muted-foreground"
                >
                  <span className="placeholder-marquee-track">
                    <span className="shrink-0 pr-10">{t("searchPlaceholder")}</span>
                    <span className="shrink-0 pr-10 placeholder-marquee-duplicate">{t("searchPlaceholder")}</span>
                  </span>
                </span>
              )}
            </label>
            <button
              type="button"
              onClick={applySearch}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-accent/30"
            >
              <Search className="h-4 w-4" />
              {t("search")}
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActive(null)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                active === null
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "border border-border bg-background text-muted-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {t("filterAll")}
            </button>
            {sections.map((section, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(active === i ? null : i)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                  active === i
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "border border-border bg-background text-muted-foreground hover:border-accent hover:text-accent"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isFiltering && (
        <section className="bg-surface pb-20 lg:pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {totalFound === 0 ? (
              <p className="py-10 text-center text-lg font-semibold text-foreground">
                {t("noResults")}
              </p>
            ) : (
              <>
                {normalized && (
                  <p className="mb-6 text-sm font-medium text-muted-foreground">
                    {totalFound} {totalFound > 1 ? t("results") : t("result")}
                  </p>
                )}
                {results.map(({ index, slug, section, images }) =>
                  images.length > 0 ? (
                    <div key={slug} className="mb-14 last:mb-0">
                      <div className="mb-5 flex items-center gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-base font-bold tracking-tight text-primary">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                          {section.title}
                        </h2>
                      </div>
                      <MissionGallery images={images} />
                    </div>
                  ) : null
                )}
              </>
            )}
          </div>
        </section>
      )}

      {!isFiltering &&
        results.map(({ index, slug, section, images }) => {
          const even = index % 2 === 0;

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
                    {String(index + 1).padStart(2, "0")}
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

                {images.length > 0 ? <MissionGallery images={images} /> : null}
              </div>
            </section>
          );
        })}
    </>
  );
}