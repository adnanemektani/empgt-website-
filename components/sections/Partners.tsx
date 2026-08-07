"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Brain, Code2, Palette, HardHat } from "lucide-react";
import { SITE } from "@/lib/site";

const PARTNERS = [
  {
    icon: Brain,
    name: "INSTITUT IA",
    tag: "Zoran Forest",
    text: "L'IA devient un levier métier au service des chantiers. Une approche innovante qui réconcilie terrain et intelligence artificielle face à des défis complexes.",
    href: "https://institutia.ai/",
  },
  {
    icon: Code2,
    name: "L'Agence Web du Mascaret",
    tag: "Élodie Moraud",
    text: "Un outil sur-mesure, bâti par une économiste de la construction, pour servir les vrais besoins du terrain.",
    href: SITE.affiliate,
  },
  {
    icon: Palette,
    name: "13 Mai Studio",
    tag: "Amandine Leblanc",
    text: "Transformer une idée technique ou architecturale en image concrète, exploitable en un claquement de doigts.",
    href: SITE.affiliate,
  },
  {
    icon: HardHat,
    name: "Ingénieurs Freelance",
    tag: "Mise à disposition",
    text: "Ingénieurs salariés et freelances pour vos chantiers : expertise renforcée, outils performants, opérationnels dès leur arrivée.",
    href: "/contact",
  },
];

export default function Partners() {
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
            Ils nous font confiance
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Nos partenaires
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Startups technologiques, studios créatifs, ingénieurs experts… Nos
            partenaires sont au cœur de notre écosystème. Ensemble, nous
            concevons, planifions et livrons des projets ambitieux et durables.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {PARTNERS.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.href}
              target={p.href.startsWith("http") ? "_blank" : undefined}
              rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />

              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20">
                  <p.icon className="h-7 w-7" />
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground/40 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                  <ArrowUpRight className="h-4.5 w-4.5" />
                </span>
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
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
