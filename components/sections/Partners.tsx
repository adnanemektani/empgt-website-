"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Brain, Files, Boxes, Palette, Plug } from "lucide-react";
import { useTranslations } from "next-intl";

const PARTNER_ICONS = [Brain, Files, Boxes, Palette, Plug];

const PARTNER_HREFS = [
  "https://institutia.ai/",
  "https://www.there.do/",
  "https://bazalt.one/",
  null,
  "https://elto-electric-together.com/",
];

export default function Partners() {
  const t = useTranslations("Partners");
  const items = t.raw("items") as {
    tag: string;
    name: string;
    text: string;
    cta: string;
  }[];

  return (
    <section id="partenaires" className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="glow-orb -right-32 top-20 h-80 w-80 bg-accent/10" />
        <div className="glow-orb -left-24 bottom-20 h-72 w-72 bg-primary/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            {t("badge")}
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => {
            const Icon = PARTNER_ICONS[i];
            const href = PARTNER_HREFS[i];
            const Wrapper = href
              ? (props: React.ComponentProps<typeof motion.a>) => <motion.a {...props} />
              : (props: React.ComponentProps<typeof motion.div>) => <motion.div {...props} />;
            return (
              <Wrapper
                key={p.name}
                {...(href
                  ? { href, target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface p-8 transition-all duration-300 ${
                  href
                    ? "cursor-pointer hover:-translate-y-1 hover:border-primary/25 hover:shadow-2xl hover:shadow-primary/10"
                    : ""
                }`}
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />

                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20">
                    <Icon className="h-7 w-7" />
                  </div>
                  {href && (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground/40 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                      <ArrowUpRight className="h-4.5 w-4.5" />
                    </span>
                  )}
                </div>

                <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-accent">
                  {p.tag}
                </p>
                <h3 className="mt-1.5 text-xl font-bold tracking-tight text-foreground">
                  {p.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.text}
                </p>
                <p className="mt-auto pt-6 text-sm font-semibold text-accent">
                  {href ? p.cta : "—"}
                </p>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}