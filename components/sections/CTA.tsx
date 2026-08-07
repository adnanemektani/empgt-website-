"use client";

import { motion } from "framer-motion";
import { Calendar, Handshake, ArrowRight, BadgeCheck, Globe, Users } from "lucide-react";
import { SITE } from "@/lib/site";

const STATS = [
  { value: "25", label: "ans d'expérience terrain" },
  { value: "40", label: "collaborateurs managés" },
  { value: "5", label: "implantations internationales" },
  { value: "150M€", label: "opérations pilotées" },
];

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="glow-orb left-1/4 top-1/3 h-72 w-72 bg-accent/15" />
        <div className="glow-orb right-10 bottom-10 h-80 w-80 bg-primary/15" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 gap-6 lg:grid-cols-4"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-surface p-6 text-center shadow-sm"
            >
              <p className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Bandeau CTA principal */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="scene-3d relative mt-16"
        >
          <div className="preserve-3d relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-accent p-10 shadow-2xl shadow-primary/25 lg:p-16">
            <div className="pointer-events-none absolute inset-0 opacity-30">
              <div className="perspective-grid absolute inset-x-[-30%] top-[-40%] bottom-0 opacity-50" />
            </div>
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/40 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-primary-foreground/10 blur-[90px]" />

            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
                  <Handshake className="h-3.5 w-3.5 text-accent" />
                  Passez à l&apos;action
                </span>
                <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Parlons de votre projet
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75">
                  Que vous soyez maître d&apos;ouvrage, entreprise générale ou
                  acteur industriel, notre équipe vous accompagne du terrain à la
                  livraison. Prenez rendez-vous en visio ou devenez partenaire
                  affilié.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={SITE.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-primary shadow-lg transition-all duration-300 hover:scale-[1.04]"
                  >
                    <Calendar className="h-4 w-4" />
                    Prendre rendez-vous en visio
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a
                    href={SITE.affiliate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/15"
                  >
                    <Handshake className="h-4 w-4" />
                    Programme Partenaires affiliés
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { icon: BadgeCheck, text: "Devis & contrats clairs, sans engagement" },
                  { icon: Globe, text: "France, Afrique francophone & international" },
                  { icon: Users, text: "Accompagnement par des ingénieurs experts" },
                ].map((f) => (
                  <div
                    key={f.text}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <f.icon className="h-4.5 w-4.5 text-accent" />
                    </span>
                    <p className="text-sm font-medium text-white/85">{f.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
