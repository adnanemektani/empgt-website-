import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import Missions from "@/components/sections/Missions";
import CTA from "@/components/sections/CTA";
import { routing } from "@/i18n/routing";
import { generatePageMetadata } from "@/lib/metas";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  return generatePageMetadata(params, {
    titleKey: "missionsTitle",
    descriptionKey: "missionsDescription",
  });
}

export default async function MissionsPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "Missions" });

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero badge={t("badge")} title={t("title")} subtitle={t("subtitle")} crumb="E-MPGT" />
        <Missions />
        <CTA />
      </main>
      <Footer />
    </>
  );
}