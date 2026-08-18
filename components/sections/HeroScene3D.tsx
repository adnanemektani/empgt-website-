"use client";

import { motion } from "framer-motion";
import { Building2, HardHat, Ruler, Wrench } from "lucide-react";

const easing = [0.22, 1, 0.36, 1] as const;

const CUBE_SIZE = 104;
const HALF = CUBE_SIZE / 2;

const FACE_BASE =
  "absolute inset-0 flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md";

const CHIPS = [
  { Icon: Building2, className: "left-0 top-6 -rotate-6", delay: 0.9 },
  { Icon: Wrench, className: "right-0 top-24 rotate-6", delay: 1.05 },
  { Icon: Ruler, className: "bottom-8 left-6 rotate-3", delay: 1.2 },
  { Icon: HardHat, className: "bottom-2 right-4 -rotate-3", delay: 1.35 },
];

export default function HeroScene3D() {
  return (
    <div className="scene-3d relative hidden h-[460px] w-full lg:block">
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

      {/* Anneau pointillé tournant */}
      <div className="spin-slow absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-accent/30" />

      {/* Cube 3D flottant */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotateY: 90 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: easing }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 preserve-3d"
      >
        <div className="float-3d preserve-3d" style={{ width: CUBE_SIZE, height: CUBE_SIZE }}>
          <div
            className="spin-slow preserve-3d"
            style={{
              width: CUBE_SIZE,
              height: CUBE_SIZE,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className={`${FACE_BASE} text-lg font-bold tracking-tight text-white`}
              style={{ transform: `translateZ(${HALF}px)` }}
            >
              E-MPGT
            </div>
            <div
              className={`${FACE_BASE} bg-accent/20 text-white/60`}
              style={{ transform: `rotateY(180deg) translateZ(${HALF}px)` }}
            >
              E-MPGT
            </div>
            <div
              className={`${FACE_BASE} bg-accent/10`}
              style={{ transform: `rotateY(90deg) translateZ(${HALF}px)` }}
            />
            <div
              className={`${FACE_BASE} bg-accent/10`}
              style={{ transform: `rotateY(-90deg) translateZ(${HALF}px)` }}
            />
            <div
              className={`${FACE_BASE} bg-accent/10`}
              style={{ transform: `rotateX(90deg) translateZ(${HALF}px)` }}
            />
            <div
              className={`${FACE_BASE} bg-accent/10`}
              style={{ transform: `rotateX(-90deg) translateZ(${HALF}px)` }}
            />
          </div>
        </div>
      </motion.div>

      {/* Cartes icônes flottantes */}
      {CHIPS.map(({ Icon, className, delay }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay, ease: easing }}
          className={`absolute ${className} preserve-3d`}
        >
          <div
            className="float-3d flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-accent/80 to-accent shadow-xl shadow-black/30 backdrop-blur-md"
            style={{ animationDelay: `${i * 1.2}s` }}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}