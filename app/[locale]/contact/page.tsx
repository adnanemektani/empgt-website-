import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactSection from "./contact-section";
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
    contactTitle: string;
    contactDescription: string;
  };

  return {
    title: meta.contactTitle,
    description: meta.contactDescription,
  };
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}