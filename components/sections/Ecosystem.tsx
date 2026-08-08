"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Users, Wrench, Truck, Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { PLATFORMS } from "@/lib/site";

const ICONS = {
  users: Users,
  wrench: Wrench,
  truck: Truck,
} as const;

function PlatformCard({ index }: { index: number }) {
  const t = useTranslations("Eco");
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareSpringX = useSpring(glareX, { stiffness: 150, damping: 20 });
  const glareSpringY = useSpring(glareY, { stiffness: 150, damping: 20 });

  const platform = PLATFORMS[index];
  const data = t.raw("platforms")[index] as {
    title: string;
    description: string;
    bullets: string[];
    cta: string;
    badge: string;
    label: string;
  };
  const Icon = ICONS[platform.icon as keyof typeof ICONS];

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 14);
    rotateX.set((0.5 - py) * 14);
    glareX.set(px * 100);
    glareY.set(py * 100);
  }

  function onLeave() {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="scene-3d"
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative h-full rounded-3xl border border-border bg-surface p-7 shadow-xl shadow-black/[0.04] transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/10"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative flex h-full flex-col"
        >
          {/* Reflet dynamique */}
          <motion.div
            style={{
              background: useTransform(
                [glareSpringX, glareSpringY],
                ([x, y]) =>
                  `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.5), transparent 55%)`
              ),
            }}
            className="pointer-events-none absolute inset-0 z-20 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

          <div
            className="flex items-start justify-between"
            style={{ transform: "translateZ(40px)" }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
              <Icon className="h-7 w-7" />
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
              <Lock className="h-3 w-3" />
              {data.badge}
            </span>
          </div>

          <div style={{ transform: "translateZ(30px)" }}>
            <h3 className="mt-6 text-xl font-bold tracking-tight text-foreground">
              {data.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {data.description}
            </p>
          </div>

          <ul
            className="mt-6 space-y-2.5"
            style={{ transform: "translateZ(20px)" }}
          >
            {data.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/80">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex-1" style={{ transform: "translateZ(30px)" }}>
            <a
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 hover:scale-[1.02] hover:bg-accent hover:shadow-lg hover:shadow-accent/30"
            >
              {data.cta}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Ecosystem() {
  const t = useTranslations("Eco");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const orbsY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="ecosysteme" ref={ref} className="relative overflow-hidden py-24 lg:py-32">
      <motion.div style={{ y: orbsY }} className="pointer-events-none absolute inset-0">
        <div className="glow-orb -left-32 top-24 h-80 w-80 bg-accent/10" />
        <div className="glow-orb -right-24 bottom-10 h-72 w-72 bg-primary/10" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            {t("badge")}
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t("titlePart1")}{" "}
            <span className="text-primary">{t("titleHighlight")}</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PLATFORMS.map((platform, i) => (
            <PlatformCard key={platform.id} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center text-sm text-muted-foreground"
        >
          {t("note")}
        </motion.p>
      </div>
    </section>
  );
}