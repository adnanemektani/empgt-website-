import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

type MetaConfig = { titleKey: string; descriptionKey: string };

export async function generatePageMetadata(
  params: Promise<{ locale: string }>,
  config: MetaConfig
): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await import(`../messages/${locale}.json`).then(
    (m) => m.default
  );
  const meta = messages.Metadata as Record<string, string>;

  return {
    title: meta[config.titleKey],
    description: meta[config.descriptionKey],
  };
}