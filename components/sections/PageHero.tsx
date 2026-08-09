"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Slide = { src: string };

const DEFAULT_SLIDES: Slide[] = [
  {
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=3840&auto=format&fit=crop",
  },
  {
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=3840&auto=format&fit=crop",
  },
  {
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=3840&auto=format&fit=crop",
  },
];

const SLIDE_DURATION = 5000;

type PageHeroProps = {
  badge: string;
  title: string;
  subtitle: string;
  crumb?: string;
  slides?: Slide[];
};

export default function PageHero({
  badge,
  title,
  subtitle,
  crumb,
  slides = DEFAULT_SLIDES,
}: PageHeroProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative flex min-h-[72vh] w-full items-center overflow-hidden bg-primary">
      {/* Carrousel d'images — même style que l'accueil */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
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
              alt=""
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
        <div className="dot-grid absolute inset-0 z-[2] opacity-20" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32 lg:px-8">
        {crumb && (
          <motion.p
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50"
          >
            {crumb}
          </motion.p>
        )}
        <motion.span
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm"
        >
          {badge}
        </motion.span>
        <motion.h1
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-6 max-w-2xl text-base text-white/85 sm:text-lg"
        >
          {subtitle}
        </motion.p>
        <motion.span
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="pointer-events-none mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/30"
        >
          E-MPGT
          <ArrowRight className="h-4 w-4" />
        </motion.span>
      </div>
    </section>
  );
}