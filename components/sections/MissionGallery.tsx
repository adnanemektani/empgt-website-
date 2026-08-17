"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { MissionImage } from "@/lib/missions";

export default function MissionGallery({ images }: { images: MissionImage[] }) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, prev, next]);

  const open = index !== null ? images[index] : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {images.map((img, i) => (
          <figure
            key={img.src}
            className="group relative overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
          >
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={img.title}
              className="relative block aspect-[4/3] w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="pointer-events-none absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <ZoomIn className="h-4 w-4" />
              </span>
            </button>
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-3 pb-2.5 pt-10 text-left backdrop-blur-[1px] transition-all duration-300 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
              <p className="truncate text-sm font-semibold text-white">{img.title}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Fermer"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Précédent"
                  className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 sm:left-6"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Suivant"
                  className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 sm:right-6"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="relative flex max-h-full w-full max-w-5xl flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[62vh] w-full overflow-hidden rounded-xl sm:h-[68vh]">
                <Image
                  src={open.src}
                  alt={open.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 80vw"
                  className="object-contain"
                />
              </div>
              <p className="mt-4 max-w-3xl px-2 text-center text-base font-semibold leading-snug text-white sm:text-lg">
                {open.title}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
