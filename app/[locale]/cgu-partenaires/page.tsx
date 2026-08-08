import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
    cguPartnersTitle: string;
    cguPartnersDescription: string;
  };

  return {
    title: meta.cguPartnersTitle,
    description: meta.cguPartnersDescription,
  };
}

export default async function CguPartenairesPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "CguPartners" });
  const sections: { title: string; body: string }[] = t.raw("sections");

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-surface pb-24 pt-36 lg:pb-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            {t("badge")}
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">{t("subtitle")}</p>

          <div className="mt-10 space-y-6 rounded-3xl border border-border bg-background p-7 shadow-sm lg:p-9">
            <p className="text-sm leading-relaxed text-foreground/85">
              {t("intro")}
            </p>
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-base font-bold tracking-tight text-foreground">
                  {s.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}