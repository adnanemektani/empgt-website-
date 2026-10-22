"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Mail, MapPin, Calendar, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import type { SanityContact } from "@/lib/sanity";
import ContactForm from "./contact-form";

const INFO_ICONS = [Mail, Calendar, MapPin];

type Props = {
  contact?: SanityContact | null;
};

export default function ContactSection({ contact }: Props) {
  const t = useTranslations("Contact");

  const info = t.raw("info") as { title: string; text: string }[];

  const email = contact?.email || SITE.email;
  const calendly = contact?.calendly || SITE.calendly;
  const office = contact?.office || t("valueFunchal");
  const phone = contact?.phone || "";
  const whatsapp = contact?.whatsapp || "";

  const text = t("platformsText");
  const textRef = useRef(text);
  useLayoutEffect(() => {
    textRef.current = text;
  }, [text]);

  const [len, setLen] = useState(0);
  const typed = len >= text.length;
  useEffect(() => {
    let anchor = textRef.current;
    const timer = setInterval(() => {
      setLen((l) => {
        if (textRef.current !== anchor) {
          anchor = textRef.current;
          return 0;
        }
        if (l >= textRef.current.length) return l;
        return l + 1;
      });
    }, 28);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-surface pb-24 pt-36 lg:pb-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="glow-orb -right-32 top-24 h-80 w-80 bg-accent/10" />
        <div className="glow-orb -left-24 bottom-20 h-72 w-72 bg-primary/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            {t("badge")}
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Infos */}
          <div className="space-y-4">
            {info.map((item, i) => {
              const Icon = INFO_ICONS[i];
              const value = i === 1 ? t("valueBookNow") : i === 2 ? office : email;
              const href =
                i === 0
                  ? `mailto:${email}`
                  : i === 1
                  ? calendly
                  : "/a-propos";
              return (
                <motion.a
                  key={item.title}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="mt-0.5 text-sm font-medium text-primary">{value}</p>
                    <p className="text-xs text-muted-foreground">{item.text}</p>
                  </div>
                </motion.a>
              );
            })}

            {/* Téléphone / WhatsApp — renseignés depuis Sanity (document `contact`) */}
            {(phone || whatsapp) && (
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-background px-5 py-4 shadow-sm"
              >
                {phone && (
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-accent"
                  >
                    <Phone className="h-4 w-4" />
                    {phone}
                  </a>
                )}
                {whatsapp && (
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-accent"
                  >
                    WhatsApp
                  </a>
                )}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-border"
>
  <motion.div
    aria-hidden
    className="pointer-events-none absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(104,178,69,0.55)_100deg,transparent_210deg)] opacity-70 blur-[12px]"
    animate={{ rotate: 360 }}
    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
  />
  <motion.div
    aria-hidden
    className="pointer-events-none absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(104,178,69,0.8)_75deg,transparent_170deg)]"
    animate={{ rotate: 360 }}
    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
  />
  <div className="relative m-[3px] overflow-hidden rounded-[calc(1rem-3px)] bg-background p-6">
    <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" />
    <div className="relative">
      <h3 className="text-lg font-bold tracking-tight text-primary">{t("platformsTitle")}</h3>
      <p className="mt-2 min-h-10 text-sm leading-relaxed text-muted-foreground">
        {text.slice(0, len)}
        {!typed && (
          <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 bg-accent align-middle animate-pulse" />
        )}
      </p>
      <Link
        href="/#ecosysteme"
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition-transform duration-300 hover:scale-105"
      >
        {t("platformsCta")} →
      </Link>
    </div>
  </div>
</motion.div>
          </div>

          {/* Formulaire de contact — envoyé vers Sanity */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="overflow-hidden rounded-3xl border border-border bg-background shadow-xl shadow-primary/5"
          >
            <div className="flex items-center justify-between border-b border-border bg-surface px-6 py-4">
              <span className="text-sm font-semibold tracking-tight text-foreground">
                {t("title")}
              </span>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                Sanity
              </span>
            </div>
            <div className="p-6 lg:p-8">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}