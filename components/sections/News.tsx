"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, ExternalLink, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { LinkedInIcon, YouTubeIcon } from "@/components/ui/BrandIcons";
import { SITE } from "@/lib/site";

const NEWS_HREFS = [
  { href: "https://youtu.be/K067GArWkjY", thumb: "https://img.youtube.com/vi/K067GArWkjY/maxresdefault.jpg" },
  { href: SITE.linkedin, thumb: null },
];

const ACCENTS = ["bg-red-500/10 text-red-600", "bg-blue-600/10 text-blue-600"];

export default function News() {
  const t = useTranslations("News");
  const items = t.raw("items") as { title: string; source: string }[];

  return (
    <section id="actualites" className="relative overflow-hidden bg-surface py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="dot-grid absolute inset-0 opacity-40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            {t("badge")}
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {items.map((item, i) => {
            const link = NEWS_HREFS[i];
            const Icon = i === 0 ? YouTubeIcon : LinkedInIcon;
            const isVideo = i === 0;
            return (
              <motion.a
                key={item.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
              >
                {/* En-tête média */}
                <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary to-accent">
                  {isVideo && link.thumb ? (
                    <Image
                      src={link.thumb}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <div className="pointer-events-none absolute inset-0 opacity-30">
                        <div className="perspective-grid absolute inset-x-[-30%] top-[-20%] bottom-0 opacity-40" />
                      </div>
                      <Icon className="relative h-16 w-16 text-white/80 transition-transform duration-300 group-hover:scale-110" />
                    </>
                  )}

                  {isVideo && (
                    <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-black/40 ring-1 ring-white/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-7 w-7 fill-white text-white" />
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${ACCENTS[i]}`}>
                      <Icon className="h-3.5 w-3.5" />
                      {item.source}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {t("recent")}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-foreground">
                    {item.title}
                  </h3>

                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-accent">
                    {t("readMore")}
                    <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}