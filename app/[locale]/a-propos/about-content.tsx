"use client";

import { motion } from "framer-motion";
import {
  HeartHandshake,
  ShieldCheck,
  GraduationCap,
  Target,
  Award,
  MapPin,
} from "lucide-react";
import { useTranslations } from "next-intl";

const VALUE_ICONS = [Target, HeartHandshake, GraduationCap, ShieldCheck, Award];

export default function AboutContent() {
  const t = useTranslations("About");

  const histoire = t.raw("histoire") as { year: string; title: string; text: string }[];
  const values = t.raw("values") as { title: string; text: string }[];
  const forces = t.raw("forces") as string[];
  const ambitions = t.raw("ambitions") as string[];
  const countries = t.raw("countries") as { country: string; city: string; note: string }[];

  return (
    <>
      {/* Histoire */}
      <section id="histoire" className="relative overflow-hidden py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="glow-orb -left-32 top-24 h-80 w-80 bg-primary/10" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
              {t("historyBadge")}
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("historyTitle")}
            </h2>
          </motion.div>

          <div className="relative mt-14">
            <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-accent/50 via-border to-transparent md:left-1/2" />
            <div className="space-y-12">
              {histoire.map((h, i) => (
                <motion.div
                  key={h.year}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex flex-col gap-4 md:flex-row md:items-start ${
                    i % 2 === 0 ? "md:pr-[calc(50%+3rem)]" : "md:ml-[calc(50%+3rem)]"
                  }`}
                >
                  <span
                    className={`absolute left-4 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent ring-4 ring-accent-soft md:left-1/2`}
                  />
                  <div className="ml-10 md:ml-0">
                    <p className="text-sm font-bold uppercase tracking-wider text-accent">
                      {h.year}
                    </p>
                    <h3 className="mt-1 text-xl font-bold tracking-tight text-foreground">
                      {h.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {h.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="relative overflow-hidden bg-surface py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="dot-grid absolute inset-0 opacity-40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              {t("valuesBadge")}
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("valuesTitle")}
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group rounded-2xl border border-border bg-background p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {v.text}
                  </p>
                </motion.div>
              );
            })}
            <div className="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-primary to-accent p-7 text-white shadow-lg">
              <p className="text-4xl font-bold tracking-tight">{t("valuesSummaryCount")}</p>
              <p className="mt-2 text-sm text-white/80">
                {t("valuesSummaryText")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Forces & Ambitions */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="glow-orb -right-32 top-24 h-80 w-80 bg-accent/10" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent"
              >
                {t("forcesBadge")}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                {t("forcesTitle")}
              </motion.h2>
              <div className="mt-8 space-y-5">
                {forces.map((s, i) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex items-start gap-3.5"
                  >
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-bold text-accent">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-foreground/85">{s}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
              >
                {t("ambitionsBadge")}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                {t("ambitionsTitle")}
              </motion.h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {t("ambitionsSub")}
              </p>
              <div className="mt-8 space-y-5">
                {ambitions.map((a, i) => (
                  <motion.div
                    key={a}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex items-start gap-3.5"
                  >
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-foreground/85">{a}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pays */}
      <section className="relative overflow-hidden bg-surface py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="dot-grid absolute inset-0 opacity-40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
              <MapPin className="h-3.5 w-3.5" />
              {t("countriesBadge")}
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("countriesTitle")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {t("countriesSub")}
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {countries.map((c, i) => (
              <motion.div
                key={c.country}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-2xl border border-border bg-background p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground">
                  {c.country}
                </h3>
                <p className="mt-1 text-sm font-medium text-primary">{c.city}</p>
                <p className="mt-1.5 text-xs text-muted-foreground">{c.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}