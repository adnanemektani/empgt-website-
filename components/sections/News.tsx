"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, ExternalLink, Clock, Globe, ChevronDown } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { SITE } from "@/lib/site";
import { GOOGLE_SHEET_CSV_URL, parseNewsCsv, getNewsTitle, youtubeThumb, isYoutubeHref, type NewsRow } from "@/lib/news";

type Card = {
  title: string;
  source: string;
  href: string;
  image: string | null;
  isVideo: boolean;
  date: string;
};

const VIEWED_KEY = "empgt-news-viewed";
const MAX_VISIBLE = 6;

const FALLBACK_HREFS = [
  {
    href: "https://youtu.be/UxEfSbKnEx0",
    thumb: "https://img.youtube.com/vi/UxEfSbKnEx0/maxresdefault.jpg",
  },
  { href: SITE.linkedin, thumb: null },
];

export default function News() {
  const t = useTranslations("News");
  const locale = useLocale();
  const [remote, setRemote] = useState<NewsRow[] | null>(null);
  const [viewed, setViewed] = useState<string[]>([]);
  const [visible, setVisible] = useState(MAX_VISIBLE);

  useEffect(() => {
    let cancelled = false;
    fetch(GOOGLE_SHEET_CSV_URL, { cache: "no-store" })
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error("sheet unavailable"))))
      .then((text) => {
        if (!cancelled) setRemote(parseNewsCsv(text));
      })
      .catch(() => {
        if (!cancelled) setRemote([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const raw = window.localStorage.getItem(VIEWED_KEY);
        if (raw) setViewed((JSON.parse(raw) as string[]).filter(Boolean));
      } catch {
        /* ignore */
      }
    });
  }, []);

  const fallbackItems = t.raw("items") as { title: string; source: string }[];

  const cards: Card[] =
    remote && remote.length > 0
      ? remote.map((row) => ({
          title: getNewsTitle(row, locale),
          source: row.source || "E-MPGT",
          href: row.href,
          image: row.image || youtubeThumb(row.href),
          isVideo: isYoutubeHref(row.href),
          date: row.date,
        }))
      : fallbackItems.map((item, i) => ({
          title: item.title,
          source: item.source,
          href: FALLBACK_HREFS[i]?.href ?? SITE.linkedin,
          image: FALLBACK_HREFS[i]?.thumb ?? null,
          isVideo: i === 0,
          date: "",
        }));

  const markViewed = (href: string) => {
    if (viewed.includes(href)) return;
    const next = [...viewed, href];
    setViewed(next);
    try {
      window.localStorage.setItem(VIEWED_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const shown = cards.slice(0, visible);

  return (
    <section id="actualites" className="relative overflow-hidden bg-surface py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="dot-grid absolute inset-0 opacity-40" />
      </div>

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl px-6 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            {t("badge")}
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">{t("subtitle")}</p>
        </motion.div>

        <div className="mt-14 flex w-full flex-col gap-3 px-4 sm:px-6 lg:px-8">
          {shown.map((item, i) => {
            const isNew = !viewed.includes(item.href);
            return (
              <motion.a
                key={`${item.href}-${i}`}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => markViewed(item.href)}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group flex w-full items-center gap-4 rounded-2xl border border-border bg-background py-3 pl-3 pr-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 sm:gap-5 sm:py-3.5"
              >
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary to-accent sm:h-[72px] sm:w-32 lg:w-36">
                  {item.image ? (
                    <>
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="200px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          const el = e.currentTarget;
                          if (el.src.includes("maxresdefault")) {
                            el.src = el.src.replace("maxresdefault", "hqdefault");
                          } else {
                            el.style.display = "none";
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
                    </>
                  ) : (
                    <>
                      <div className="pointer-events-none absolute inset-0 opacity-30">
                        <div className="perspective-grid absolute inset-x-[-30%] top-[-20%] bottom-0 opacity-40" />
                      </div>
                      <Globe className="relative m-auto block h-8 w-8 text-white/80" />
                    </>
                  )}

                  {item.isVideo && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 ring-1 ring-white/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                        <Play className="h-4 w-4 fill-white text-white" />
                      </span>
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {isNew && (
                      <span className="shrink-0 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-sm">
                        New
                      </span>
                    )}
                    <h3 className="truncate text-sm font-semibold leading-snug tracking-tight text-foreground sm:text-base">
                      {item.title}
                    </h3>
                  </div>

                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 font-semibold text-primary">
                      {item.source}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {item.date || t("recent")}
                    </span>
                  </div>
                </div>

                <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-accent" />
              </motion.a>
            );
          })}

          {cards.length > visible && (
            <div className="mt-6 text-center">
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => setVisible(cards.length)}
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary-soft px-6 py-2.5 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                {t("viewMore")}
                <ChevronDown className="h-4 w-4" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}