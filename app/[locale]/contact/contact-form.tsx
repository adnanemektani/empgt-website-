"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";

const SUBJECT_KEYS = [
  "btp",
  "materiel",
  "logistique",
  "partenariat",
  "autre",
] as const;

type SubjectKey = (typeof SUBJECT_KEYS)[number];

type FormValues = {
  name: string;
  email: string;
  company: string;
  subject: SubjectKey;
  message: string;
  website: string;
};

const inputClasses =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors";

export default function ContactForm() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(2, t("errorName")),
        email: z.email(t("errorEmail")),
        company: z.string().trim().max(160),
        subject: z.enum(SUBJECT_KEYS),
        message: z.string().trim().min(10, t("errorMessage")),
        website: z.string().max(200),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: "btp",
      message: "",
      website: "",
    },
  });

  const subjects = t.raw("subjects") as Record<string, string>;

  const onSubmit = handleSubmit(async (values) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  });

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl px-6 py-12 text-center"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h3 className="mt-6 text-xl font-bold tracking-tight text-foreground">
          {t("successTitle")}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {t("successText")}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          {t("title")}
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block text-sm font-semibold text-foreground"
          >
            {t("labelName")}
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder={t("placeholderName")}
            aria-invalid={!!errors.name}
            {...register("name")}
            className={`${inputClasses} ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs font-medium text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="mb-2 block text-sm font-semibold text-foreground"
          >
            {t("labelEmail")}
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder={t("placeholderEmail")}
            aria-invalid={!!errors.email}
            {...register("email")}
            className={`${inputClasses} ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs font-medium text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-company"
          className="mb-2 block text-sm font-semibold text-foreground"
        >
          {t("labelCompany")}{" "}
          <span className="font-normal text-muted-foreground">
            {t("optCompany")}
          </span>
        </label>
        <input
          id="contact-company"
          type="text"
          autoComplete="organization"
          placeholder={t("placeholderCompany")}
          {...register("company")}
          className={inputClasses}
        />
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="mb-2 block text-sm font-semibold text-foreground"
        >
          {t("labelSubject")}
        </label>
        <select
          id="contact-subject"
          defaultValue="btp"
          {...register("subject")}
          className={`${inputClasses} appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235a6678' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          }}
        >
          {SUBJECT_KEYS.map((key) => (
            <option key={key} value={key}>
              {subjects[key]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-2 block text-sm font-semibold text-foreground"
        >
          {t("labelMessage")}
        </label>
        <textarea
          id="contact-message"
          rows={6}
          placeholder={t("placeholderMessage")}
          aria-invalid={!!errors.message}
          {...register("message")}
          className={`${inputClasses} resize-y ${errors.message ? "border-red-500" : ""}`}
        />
        {errors.message && (
          <p className="mt-1.5 text-xs font-medium text-red-600">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Pot de miel — invisible, seuls les robots le remplissent. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {status === "error" && (
        <p className="rounded-xl border border-red-500/30 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {t("errorSend")}
        </p>
      )}

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
          {t("privacy")}
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-accent/30 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("sending")}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {t("send")}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
