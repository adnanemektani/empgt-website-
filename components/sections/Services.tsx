"use client";

import { motion } from "framer-motion";
import { Compass, ClipboardCheck, Lightbulb, Globe2, PackageSearch, TrendingUp } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    icon: Compass,
    title: "Conseil stratégique",
    text: "Analyse de faisabilité, projections budgétaires et appui à la décision des maîtres d'ouvrage et des entreprises.",
  },
  {
    icon: ClipboardCheck,
    title: "Pilotage de projets",
    text: "Planification, suivi & reporting, coordination des intervenants, contrôle des jalons, coûts, risques et qualité.",
  },
  {
    icon: Lightbulb,
    title: "Transformation & innovation",
    text: "Optimisation des processus, méthodes agiles, robotisation et automatisation des process pour gagner en performance.",
  },
  {
    icon: Globe2,
    title: "Développement international",
    text: "Projets transfrontaliers, coordination ingénieurs européens et locaux, adaptation réglementaire et logistique.",
  },
  {
    icon: PackageSearch,
    title: "Logistique intégrée",
    text: "Optimisation de la chaîne d'approvisionnement : sourcing, stockage, livraison et gestion import-export.",
  },
  {
    icon: TrendingUp,
    title: "Filière de réemploi",
    text: "Intégration du réemploi de matériel et matériaux européens, dans une démarche RSE et d'économie circulaire.",
  },
];

export default function Services() {
  return (
    <section id="metiers" className="relative overflow-hidden bg-surface py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="dot-grid absolute inset-0 opacity-40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
            >
              BTP & Ingénierie
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Nos métiers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-base leading-relaxed text-muted-foreground"
            >
              E-MPGT intervient en conseil BTP sur la stratégie, le pilotage de
              projets, la digitalisation, la logistique et le développement
              international. Nous accompagnons les entreprises pour structurer,
              optimiser et innover à chaque étape de leurs projets.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8"
            >
              <Link
                href="/a-propos"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 hover:scale-[1.03] hover:bg-accent"
              >
                Découvrir nos missions
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
