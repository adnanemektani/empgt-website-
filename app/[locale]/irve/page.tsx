import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import Irve from "@/components/sections/Irve";
import CTA from "@/components/sections/CTA";
import { routing } from "@/i18n/routing";
import { generatePageMetadata } from "@/lib/metas";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  return generatePageMetadata(params, {
    titleKey: "irveTitle",
    descriptionKey: "irveDescription",
  });
}

export default async function IrvePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "Irve" });

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero badge={t("badge")} title={t("title")} subtitle={t("intro")} />
        <Irve showHeader={false} />
        <CTA />
      </main>
      <Footer />
    </>
  );
}