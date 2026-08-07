"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Calendar, Sparkles, Users, Wrench, Truck } from "lucide-react";
import { SITE } from "@/lib/site";

const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=3840&auto=format&fit=crop",
    alt: "Chantier de construction BTP",
  },
  {
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=3840&auto=format&fit=crop",
    alt: "Plan et ingénierie de construction",
  },
  {
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=3840&auto=format&fit=crop",
    alt: "Logistique et fret international",
  },
];

const SLIDE_DURATION = 5000;

const CARDS = [
  { title: "Profils BTP", icon: Users, color: "from-accent/90 to-accent" },
  { title: "Matériel", icon: Wrench, color: "from-primary/90 to-primary" },
  { title: "Logistique", icon: Truck, color: "from-accent/90 to-accent" },
];

const easing = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-primary"
    >
      {/* Carrousel d'images 4K — domaine d'activité */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => (
          <motion.div
            key={slide.src}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: i === index ? 1 : 0,
              scale: i === index ? 1 : 1.12,
            }}
            transition={{
              opacity: { duration: 1.4, ease: "easeInOut" },
              scale: { duration: 9, ease: "linear" },
            }}
            style={{ zIndex: i === index ? 1 : 0 }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              quality={100}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        ))}

        {/* Voiles lisibilité */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-primary via-primary/75 to-primary/40" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-primary/85 via-primary/30 to-transparent" />
      </div>

      {/* Halos 3D */}
      <div className="pointer-events-none absolute inset-0 z-[2]">
        <div className="glow-orb left-1/4 top-1/4 h-80 w-80 bg-accent/20" />
      </div>

      {/* Contenu */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 lg:px-8"
      >
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              25 ans d&apos;expertise terrain
            </motion.div>

            <motion.h1
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Conseil BTP,{" "}
              <span className="relative whitespace-nowrap">
                sourcing
                <svg
                  viewBox="0 0 220 12"
                  fill="none"
                  className="absolute -bottom-1 left-0 h-3 w-full text-accent"
                  aria-hidden
                >
                  <path
                    d="M2 9C60 3 150 2 218 7"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              et logistique internationale
            </motion.h1>

            <motion.p
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-6 max-w-xl text-base text-white/85 sm:text-lg"
            >
              {SITE.description} Un écosystème de plateformes dédiées pour vos
              profils, votre matériel et vos flux logistiques.
            </motion.p>

            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/30 transition-all duration-300 hover:scale-[1.04] hover:shadow-accent/40"
              >
                Déposer une demande
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/15"
              >
                <Calendar className="h-4 w-4" />
                Prendre rendez-vous
              </a>
            </motion.div>

            {/* Indicateurs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-12 flex gap-2"
            >
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Image ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-8 bg-accent" : "w-4 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </motion.div>
          </div>

          {/* Scène 3D droite */}
          <div className="scene-3d relative hidden h-[460px] lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: easing }}
              className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: easing }}
              className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40"
            />

            {/* Badge central flottant */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: easing }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 preserve-3d"
            >
              <div className="float-3d flex h-32 w-32 items-center justify-center rounded-3xl border border-white/20 bg-white/10 shadow-2xl shadow-black/40 backdrop-blur-md">
                <span className="text-xl font-bold tracking-tight text-white">
                  E-MPGT
                </span>
              </div>
            </motion.div>

            {/* Cartes flottantes */}
            {CARDS.map((card, i) => {
              const Icon = card.icon;
              const positions = [
                "left-0 top-6 -rotate-6",
                "right-0 top-24 rotate-6",
                "bottom-6 left-8 rotate-3",
              ];
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 40, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 + i * 0.15, ease: easing }}
                  className={`absolute ${positions[i]} preserve-3d`}
                >
                  <div
                    className={`float-3d flex items-center gap-3 rounded-2xl border border-white/20 bg-gradient-to-br ${card.color} px-5 py-4 shadow-xl shadow-black/30 backdrop-blur-md`}
                    style={{ animationDelay: `${i * 1.4}s` }}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                      <Icon className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <p className="text-xs text-white/80">{card.title}</p>
                      <p className="text-sm font-semibold text-white">
                        Plateforme dédiée
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
