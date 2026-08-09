"use client";

import { motion } from "framer-motion";
import { Compass, PackageSearch, Recycle, Globe2, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PLATFORMS } from "@/lib/site";

type Section = {
  num: string;
  title: string;
  tagline: string;
  text: string;
  listLabel: string;
  items: string[];
  note?: string;
  cta: string;
};

const SECTION_ICONS = [Compass, PackageSearch, Recycle, Globe2];

// Boutons liés à une plateforme -> site externe ; les autres -> contact.
const SECTION_LINKS = [
  { href: "/contact", external: false },
  { href: PLATFORMS[1].href, external: true },
  { href: "/contact", external: false },
  { href: PLATFORMS[2].href, external: true },
] as const;

export default function Expertises({ showHeader = true }: { showHeader?: boolean }) {
  const t = useTranslations("Services");
  const sections = t.raw("sections") as Section[];

  return (
    <section id="expertises" className="relative overflow-hidden bg-surface py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="dot-grid absolute inset-0 opacity-40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {showHeader && (
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
        )}

        <div className={`${showHeader ? "mt-16" : "mt-2"} space-y-16`}>
          {sections.map((s, i) => {
            const Icon = SECTION_ICONS[i];
            const link = SECTION_LINKS[i];
            const inner = (
              <>
                {s.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            );
            const btnClass =
              "group mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 hover:scale-[1.02] hover:bg-accent hover:shadow-lg hover:shadow-accent/30";
            return (
              <motion.div
                key={s.num}
                id={s.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
              >
                <div className="lg:sticky lg:top-28">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="text-5xl font-bold tracking-tight text-primary/10">
                      {s.num}
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-base font-medium text-accent">{s.tagline}</p>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={btnClass}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link href={link.href} className={btnClass}>
                      {inner}
                    </Link>
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {s.listLabel}
                  </p>
                  <ul className="mt-4 divide-y divide-border rounded-2xl border border-border bg-background shadow-sm">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 p-5 text-sm leading-relaxed text-foreground/85"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {s.note && (
                    <p className="mt-5 text-sm italic leading-relaxed text-muted-foreground">
                      {s.note}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}