import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { hasLocale } from "next-intl";
import { Geist, Geist_Mono, Noto_Sans_Arabic, Noto_Sans_SC } from "next/font/google";
import { routing } from "@/i18n/routing";
import { SITE } from "@/lib/site";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await import(`../../messages/${locale}.json`).then(
    (m) => m.default
  );
  const meta = messages.Metadata as {
    homeTitle: string;
    homeDescription: string;
  };

  return {
    title: meta.homeTitle,
    description: meta.homeDescription,
    openGraph: {
      title: meta.homeTitle,
      description: meta.homeDescription,
      siteName: SITE.name,
      locale,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const fontClass =
    locale === "ar"
      ? `${notoArabic.variable} ${geistMono.variable}`
      : locale === "zh"
      ? `${notoSansSC.variable} ${geistMono.variable}`
      : `${geistSans.variable} ${geistMono.variable}`;

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${fontClass} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}