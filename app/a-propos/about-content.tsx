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

const HISTORY = [
  {
    year: "Avant 2018",
    title: "Fondations d'une expertise",
    text: "17 années d'expérience terrain au sein des majors du BTP français, avec une compréhension fine des réalités de chantier et des acteurs de la construction.",
  },
  {
    year: "2018",
    title: "Naissance de MPGT",
    text: "Création de MPGT, société spécialisée dans le conseil en ingénierie pour le bâtiment. Objectif : mettre l'expérience au service de projets ambitieux.",
  },
  {
    year: "2018 – 2023",
    title: "Croissance en France",
    text: "Une approche résolument opérationnelle, au plus près du terrain. Un modèle de conseil différenciant, adapté aux réalités des chantiers.",
  },
  {
    year: "2024",
    title: "Création d'E-MPGT",
    text: "Face au ralentissement du marché français et à l'émergence d'opportunités internationales, MPGT crée E-MPGT pour structurer un conseil à forte valeur ajoutée et exporter le savoir-faire européen, notamment en Afrique.",
  },
  {
    year: "2025",
    title: "Une dynamique internationale",
    text: "Expertise européenne en ingénierie travaux et intégration de technologies de pointe pour accompagner la transformation des territoires.",
  },
];

const VALUES = [
  {
    icon: Target,
    title: "Engagement",
    text: "Méthode, rigueur et détermination. Tenir les délais, maîtriser les budgets et garantir des conditions de travail fiables.",
  },
  {
    icon: HeartHandshake,
    title: "Confiance",
    text: "Le fondement de toutes nos relations, construite par la transparence, la fiabilité et la constance dans les résultats.",
  },
  {
    icon: GraduationCap,
    title: "Transmission",
    text: "Former, accompagner et faire grandir les équipes renforce la qualité des projets sur le long terme.",
  },
  {
    icon: ShieldCheck,
    title: "Exigence",
    text: "Précision, régularité et maîtrise. Chaque détail compte : c'est ce niveau d'attention qui garantit la qualité durable.",
  },
  {
    icon: Award,
    title: "Respect",
    text: "Un principe non négociable, exprimé dans nos décisions, nos échanges et nos actions vis-à-vis des personnes et des engagements.",
  },
];

const STRENGTHS = [
  "Une double culture, terrain et maîtrise d'ouvrage, qui alimente notre agilité et notre justesse d'analyse.",
  "Des ingénieurs engagés, agiles et orientés solution, capables d'analyser rapidement et d'agir avec pragmatisme.",
  "Une structure à taille humaine, une exigence constante : proximité, clarté, rigueur.",
  "Une approche conseil et terrain : maîtrise opérationnelle et vision stratégique au plus près des enjeux réels.",
];

const AMBITIONS = [
  "Faire émerger et valoriser les talents locaux sur des projets visibles à l'international.",
  "Créer des passerelles concrètes entre expertises africaines et européennes, dans un esprit de partenariat équilibré.",
  "Renforcer les capacités locales par le transfert de compétences et la montée en responsabilité.",
  "Devenir un partenaire de référence pour les acteurs du BTP africain.",
];

const COUNTRIES = [
  { country: "Portugal", city: "Funchal, Madère", note: "Siège du groupe" },
  { country: "France", city: "Paris", note: "Agence" },
  { country: "Maroc", city: "Casablanca", note: "Agence" },
  { country: "Sénégal", city: "Dakar", note: "Agence" },
  { country: "Côte d'Ivoire", city: "Abidjan", note: "Agence" },
];

export default function AboutContent() {
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
              L&apos;histoire
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Les grandes étapes qui ont façonné notre entreprise
            </h2>
          </motion.div>

          <div className="relative mt-14">
            <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-accent/50 via-border to-transparent md:left-1/2" />
            <div className="space-y-12">
              {HISTORY.map((h, i) => (
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
              Nos valeurs
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Le socle de notre identité
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-2xl border border-border bg-background p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                  {v.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {v.text}
                </p>
              </motion.div>
            ))}
            <div className="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-primary to-accent p-7 text-white shadow-lg">
              <p className="text-4xl font-bold tracking-tight">5</p>
              <p className="mt-2 text-sm text-white/80">
                valeurs fondamentales qui guident nos actions et nos relations,
                sur le terrain comme en interne.
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
                Nos forces
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                Savoir-faire traditionnel et solutions innovantes
              </motion.h2>
              <div className="mt-8 space-y-5">
                {STRENGTHS.map((s, i) => (
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
                Nos ambitions
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                Une vision au-delà des frontières
              </motion.h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                L&apos;avenir du BTP se construit localement, en valorisant les
                énergies, les savoir-faire et les talents des territoires. Nous
                croyons à la puissance du partenariat durable et à la capacité
                des acteurs africains à porter des projets d&apos;envergure.
              </p>
              <div className="mt-8 space-y-5">
                {AMBITIONS.map((a, i) => (
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
              Nos présences internationales
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Présents au cœur des projets
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Nous suivons nos clients là où les projets prennent forme, en
              mobilisant des équipes capables d&apos;intervenir rapidement,
              efficacement, et en toute autonomie.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {COUNTRIES.map((c, i) => (
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
