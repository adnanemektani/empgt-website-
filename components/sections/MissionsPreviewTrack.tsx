"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import type { MissionImage, MissionSlug } from "@/lib/mission-slugs";

type Card = {
  slug: MissionSlug;
  title: string;
  description: string;
  images: MissionImage[];
};

type Props = {
  cards: Card[];
  badge: string;
  title: string;
  subtitle: string;
  hint: string;
  cta: string;
};

const SPEED = 45; // px / seconde
const RESUME_DELAY = 600; // ms avant de reprendre le défilement auto après un drag

export default function MissionsPreviewTrack({
  cards,
  badge,
  title,
  subtitle,
  hint,
  cta,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const pressedRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rtl = getComputedStyle(el).direction === "rtl";
    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = now - last;
      last = now;
      if (!pausedRef.current) {
        const half = el.scrollWidth / 2;
        el.scrollLeft += ((rtl ? -1 : 1) * SPEED * dt) / 1000;
        if (!rtl && el.scrollLeft >= half) el.scrollLeft -= half;
        if (rtl && el.scrollLeft <= -half) el.scrollLeft += half;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => () => clearTimeout(resumeTimeoutRef.current), []);

  const scheduleResume = () => {
    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY);
  };

  // Le drag ne s'active (et ne capture le pointeur) qu'après un vrai mouvement :
  // capturer dès le pointerdown reciblerait aussi le "click" d'un simple tap sur le
  // conteneur, ce qui empêche les liens des cartes (ex. "Voir la mission") de fonctionner.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !trackRef.current) {
      pausedRef.current = true;
      return;
    }
    pressedRef.current = true;
    draggingRef.current = false;
    pausedRef.current = true;
    startXRef.current = e.clientX;
    startScrollRef.current = trackRef.current.scrollLeft;
    pointerIdRef.current = e.pointerId;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !pressedRef.current || !trackRef.current) return;
    const dx = e.clientX - startXRef.current;
    if (!draggingRef.current) {
      if (Math.abs(dx) <= 5) return;
      draggingRef.current = true;
      if (pointerIdRef.current !== null) {
        trackRef.current.setPointerCapture(pointerIdRef.current);
      }
    }
    trackRef.current.scrollLeft = startScrollRef.current - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") {
      pressedRef.current = false;
      draggingRef.current = false;
      if (pointerIdRef.current !== null && trackRef.current?.hasPointerCapture(pointerIdRef.current)) {
        trackRef.current.releasePointerCapture(pointerIdRef.current);
      }
      pointerIdRef.current = null;
    }
    scheduleResume();
  };

  const loop = [...cards, ...cards];

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="dot-grid absolute inset-0 opacity-30" />
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
            {badge}
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">{subtitle}</p>
        </motion.div>
      </div>

      <div
        ref={trackRef}
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          if (!draggingRef.current) pausedRef.current = false;
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="no-scrollbar relative mt-14 flex cursor-grab gap-6 overflow-x-auto px-6 pb-2 active:cursor-grabbing lg:px-8"
      >
        {loop.map((card, i) => (
          <MissionCard key={`${card.slug}-${i}`} card={card} cta={cta} />
        ))}
      </div>

      <p className="relative mt-6 text-center text-xs text-muted-foreground">{hint}</p>
    </section>
  );
}

function MissionCard({ card, cta }: { card: Card; cta: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (card.images.length < 2) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % card.images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [card.images.length]);

  const image = card.images[index];

  return (
    <div className="group flex w-[300px] shrink-0 select-none flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/10 sm:w-[340px]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <AnimatePresence>
          <motion.div
            key={image.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={image.src}
              alt={image.title}
              fill
              draggable={false}
              sizes="(max-width: 640px) 300px, 340px"
              className="pointer-events-none object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary shadow-sm backdrop-blur-sm">
          {card.title}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold tracking-tight text-foreground">{card.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {card.description}
        </p>
        <Link
          href={`/nos-missions#${card.slug}`}
          draggable={false}
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-accent"
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}
