"use client";

import { motion } from "framer-motion";
import { MonitorSmartphone, Brain, Bot, Boxes, LayoutGrid, Code2, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const TECH_ICONS = [MonitorSmartphone, Brain, Bot, Boxes, LayoutGrid, Code2];

export default function Tech({ showHeader = true }: { showHeader?: boolean }) {
  const t = useTranslations("Tech");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <section id="technologies" className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="glow-orb -left-32 top-20 h-80 w-80 bg-primary/10" />
        <div className="glow-orb -right-24 bottom-10 h-72 w-72 bg-accent/10" />
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
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
              {t("badge")}
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {t("intro")}
            </p>
          </motion.div>
        )}

        <div className={`${showHeader ? "mt-14" : "mt-2"} grid gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
          {items.map((tech, i) => {
            const Icon = TECH_ICONS[i];
            return (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                  {tech.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {tech.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-md shadow-accent/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-accent/30"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}