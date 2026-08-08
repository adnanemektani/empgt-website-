"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutHero() {
  const t = useTranslations("AboutHero");

  return (
    <section className="relative flex min-h-[60vh] w-full items-center overflow-hidden bg-primary">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1d2a63] via-primary to-[#232e63]" />
        <div className="glow-orb left-1/2 top-[-20%] h-[420px] w-[420px] -translate-x-1/2 bg-accent/25" />
        <div className="glow-orb -right-24 top-1/3 h-80 w-80 bg-primary-foreground/10" />
        <div className="dot-grid absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh] overflow-hidden">
          <div className="perspective-grid absolute inset-x-[-40%] bottom-0 top-0" />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-20 lg:px-8">
        <motion.span
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm"
        >
          {t("badge")}
        </motion.span>
        <motion.h1
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {t("title")}
        </motion.h1>
        <motion.p
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-6 max-w-2xl text-base text-white/80 sm:text-lg"
        >
          {t("text")}
        </motion.p>
        <motion.a
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          href="#histoire"
          className="group mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-black/30 transition-all duration-300 hover:scale-[1.04]"
        >
          {t("cta")}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:rotate-90" />
        </motion.a>
      </div>
    </section>
  );
}