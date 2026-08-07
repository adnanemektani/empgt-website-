"use client";

import { motion } from "framer-motion";
import { Play, ExternalLink, Clock } from "lucide-react";
import { LinkedInIcon, YouTubeIcon } from "@/components/ui/BrandIcons";
import { SITE } from "@/lib/site";

const NEWS = [
  {
    type: "video",
    title: "25 ans de terrain pour une IA responsable au service du Maroc",
    source: "YouTube",
    icon: YouTubeIcon,
    href: "https://www.youtube.com/",
    accent: "bg-red-500/10 text-red-600",
  },
  {
    type: "linkedin",
    title:
      "E-MPGT est fière d'annoncer son partenariat avec INSTITUT IA !",
    source: "LinkedIn",
    icon: LinkedInIcon,
    href: SITE.linkedin,
    accent: "bg-blue-600/10 text-blue-600",
  },
];

export default function News() {
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
            Nos actualités
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            E-MPGT en mouvement
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Suivez nos dernières annonces, partenariats et innovations dans le
            secteur du BTP et de l&apos;ingénierie.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {NEWS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.title}
                href={item.href}
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
                  <div className="pointer-events-none absolute inset-0 opacity-30">
                    <div className="perspective-grid absolute inset-x-[-30%] top-[-20%] bottom-0 opacity-40" />
                  </div>
                  {item.type === "video" ? (
                    <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-8 w-8 fill-white text-white" />
                    </span>
                  ) : (
                    <Icon className="relative h-16 w-16 text-white/80 transition-transform duration-300 group-hover:scale-110" />
                  )}
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${item.accent}`}>
                      <Icon className="h-3.5 w-3.5" />
                      {item.source}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      Récent
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-foreground">
                    {item.title}
                  </h3>

                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-accent">
                    Lire la publication
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
