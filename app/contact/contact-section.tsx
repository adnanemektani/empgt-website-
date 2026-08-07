"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Mail, MapPin, Calendar, CheckCircle2, Send } from "lucide-react";
import { SITE } from "@/lib/site";

const schema = z.object({
  name: z.string().min(2, "Votre nom est requis"),
  email: z.string().email("Adresse e-mail invalide"),
  company: z.string().optional(),
  subject: z.enum(["btp", "materiel", "logistique", "partenariat", "autre"]),
  message: z.string().min(10, "Votre message doit contenir au moins 10 caractères"),
});

type FormData = z.infer<typeof schema>;

const SUBJECTS = [
  { value: "btp", label: "Conseil BTP & Ingénierie" },
  { value: "materiel", label: "Sourcing matériel" },
  { value: "logistique", label: "Logistique & fret" },
  { value: "partenariat", label: "Partenariat / Affiliation" },
  { value: "autre", label: "Autre demande" },
] as const;

const CONTACT_INFO = [
  {
    icon: Mail,
    title: "Par e-mail",
    text: "Réponse sous 24h ouvrées",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: Calendar,
    title: "Rendez-vous visio",
    text: "30 minutes avec un expert",
    value: "Prendre rendez-vous",
    href: SITE.calendly,
  },
  {
    icon: MapPin,
    title: "Siège du groupe",
    text: "Portugal · France · Maroc · Côte d'Ivoire",
    value: "Funchal, Madère",
    href: "/a-propos",
  },
];

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { subject: "btp" },
  });

  async function onSubmit(data: FormData) {
    await new Promise((r) => setTimeout(r, 900));
    console.log("Demande envoyée (démo) :", data);
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 6000);
  }

  const inputClass = (hasError?: boolean) =>
    `w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-colors duration-200 placeholder:text-muted-foreground/60 focus:ring-2 ${
      hasError
        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
        : "border-border focus:border-primary focus:ring-primary/10"
    }`;

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
            Nous contacter
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Parlons de votre projet
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Décrivez votre besoin : notre équipe vous répond sous 24h ouvrées
            avec un premier échange qualifié.
          </p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Infos */}
          <div className="space-y-4">
            {CONTACT_INFO.map((info, i) => (
              <motion.a
                key={info.title}
                href={info.href}
                target={info.href.startsWith("http") ? "_blank" : undefined}
                rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                  <info.icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{info.title}</p>
                  <p className="mt-0.5 text-sm font-medium text-primary">{info.value}</p>
                  <p className="text-xs text-muted-foreground">{info.text}</p>
                </div>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="rounded-2xl bg-gradient-to-br from-primary to-accent p-6 text-white shadow-lg"
            >
              <h3 className="text-lg font-bold tracking-tight">Nos plateformes</h3>
              <p className="mt-2 text-sm text-white/80">
                Les plateformes Freelance, Matériel et Logistique sont
                disponibles prochainement via notre écosystème.
              </p>
              <Link
                href="/#ecosysteme"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/20 transition-colors hover:bg-white/20"
              >
                Voir l&apos;écosystème →
              </Link>
            </motion.div>
          </div>

          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl border border-border bg-background p-7 shadow-xl shadow-primary/5 lg:p-9"
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <CheckCircle2 className="h-8 w-8" />
                  </span>
                  <h3 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
                    Demande envoyée !
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    Merci pour votre message. Notre équipe vous recontactera
                    sous 24h ouvrées.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                        Nom complet *
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Votre nom"
                        className={inputClass(!!errors.name)}
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                        E-mail *
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="vous@exemple.com"
                        className={inputClass(!!errors.email)}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-foreground">
                        Société <span className="text-muted-foreground">(optionnel)</span>
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Nom de votre société"
                        className={inputClass()}
                        {...register("company")}
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-foreground">
                        Sujet *
                      </label>
                      <select id="subject" className={inputClass()} {...register("subject")}>
                        {SUBJECTS.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
                      Votre message *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Décrivez votre projet, vos besoins, vos délais…"
                      className={`${inputClass(!!errors.message)} resize-none`}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.02] hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Envoi en cours…
                      </>
                    ) : (
                      <>
                        Envoyer la demande
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-muted-foreground">
                    Vos données restent confidentielles et ne sont jamais cédées
                    à des tiers.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
