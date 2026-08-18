import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import Profils from "@/components/sections/Profils";
import CTA from "@/components/sections/CTA";
import { routing } from "@/i18n/routing";
import { generatePageMetadata } from "@/lib/metas";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  return generatePageMetadata(params, {
    titleKey: "profilsTitle",
    descriptionKey: "profilsDescription",
  });
}

export default async function ProfilsPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "Profils" });

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero badge={t("badge")} title={t("title")} subtitle={t("intro")} />
        <Profils showHeader={false} />
        <CTA />
      </main>
      <Footer />
    </>
  );
}