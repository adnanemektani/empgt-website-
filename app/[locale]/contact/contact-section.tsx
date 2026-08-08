"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Mail, MapPin, Calendar, CheckCircle2, Send } from "lucide-react";
import { SITE } from "@/lib/site";

const SUBJECT_VALUES = ["btp", "materiel", "logistique", "partenariat", "autre"] as const;

const INFO_ICONS = [Mail, Calendar, MapPin];

export default function ContactSection() {
  const t = useTranslations("Contact");
  const [sent, setSent] = useState(false);

  const schema = z.object({
    name: z.string().min(2, t("errorName")),
    email: z.string().email(t("errorEmail")),
    company: z.string().optional(),
    subject: z.enum(SUBJECT_VALUES),
    message: z.string().min(10, t("errorMessage")),
  });
  type Schema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: { subject: "btp" },
  });

  async function onSubmit(data: Schema) {
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

  const info = t.raw("info") as { title: string; text: string }[];
  const subjects = SUBJECT_VALUES.map((v) => ({ value: v, label: t(`subjects.${v}`) }));

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
              const value =
                i === 1 ? t("valueBookNow") : i === 2 ? t("valueFunchal") : SITE.email;
              const href =
                i === 0
                  ? `mailto:${SITE.email}`
                  : i === 1
                  ? SITE.calendly
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

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="rounded-2xl bg-gradient-to-br from-primary to-accent p-6 text-white shadow-lg"
            >
              <h3 className="text-lg font-bold tracking-tight">{t("platformsTitle")}</h3>
              <p className="mt-2 text-sm text-white/80">{t("platformsText")}</p>
              <Link
                href="/#ecosysteme"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/20 transition-colors hover:bg-white/20"
              >
                {t("platformsCta")} →
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
                    {t("successTitle")}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    {t("successText")}
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
                        {t("labelName")} *
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder={t("placeholderName")}
                        className={inputClass(!!errors.name)}
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                        {t("labelEmail")} *
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder={t("placeholderEmail")}
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
                        {t("labelCompany")}{" "}
                        <span className="text-muted-foreground">{t("optCompany")}</span>
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder={t("placeholderCompany")}
                        className={inputClass()}
                        {...register("company")}
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-foreground">
                        {t("labelSubject")} *
                      </label>
                      <select id="subject" className={inputClass()} {...register("subject")}>
                        {subjects.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
                      {t("labelMessage")} *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder={t("placeholderMessage")}
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
                        {t("sending")}
                      </>
                    ) : (
                      <>
                        {t("send")}
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-muted-foreground">
                    {t("privacy")}
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