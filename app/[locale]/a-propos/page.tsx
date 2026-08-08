import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "./about-hero";
import AboutContent from "./about-content";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await import(`../../../messages/${locale}.json`).then(
    (m) => m.default
  );
  const meta = messages.Metadata as {
    aboutTitle: string;
    aboutDescription: string;
  };

  return {
    title: meta.aboutTitle,
    description: meta.aboutDescription,
  };
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <AboutHero />
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}