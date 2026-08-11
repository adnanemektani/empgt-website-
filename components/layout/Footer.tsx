import Image from "next/image";
import { Calendar, ExternalLink } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LinkedInIcon } from "@/components/ui/BrandIcons";
import { SITE, PLATFORMS } from "@/lib/site";

const NAV_KEYS = [
  { key: "home", href: "/" },
  { key: "about", href: "/a-propos" },
  { key: "expertises", href: "/expertises" },
  { key: "missions", href: "/nos-missions" },
  { key: "technologies", href: "/technologies" },
  { key: "profils", href: "/profils" },
  { key: "irve", href: "/irve" },
  { key: "ecosystem", href: "/#ecosysteme" },
  { key: "partners", href: "/#partenaires" },
  { key: "news", href: "/#actualites" },
  { key: "contact", href: "/contact" },
];

export default async function Footer() {
  const t = await getTranslations("Footer");
  const nav = NAV_KEYS.map((item) => ({ ...item, label: t(item.key) }));
  const eco = await getTranslations("Eco");

  const platforms = (eco.raw("platforms") as { title: string }[]).map(
    (p, i) => ({ ...p, ...PLATFORMS[i] })
  );

  return (
    <footer className="relative overflow-hidden bg-primary text-white">
      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-accent/20 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-80 w-80 rounded-full bg-primary-foreground/10 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 p-1.5 ring-1 ring-white/20">
                <Image
                  src="/logos/empgt-logo-transparent.png"
                  alt="E-MPGT"
                  width={160}
                  height={50}
                  className="w-auto"
                  priority
                />
              </span>
              <div>
                <p className="text-lg font-bold tracking-tight">E-MPGT</p>
                <p className="text-xs text-white/60">{t("group")}</p>
              </div>
            </Link>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">
              {t("tagline")} {t("subtitle")}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 transition-all duration-300 hover:scale-110 hover:bg-white/20"
              >
                <LinkedInIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("ctaCalendly")}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 transition-all duration-300 hover:scale-110 hover:bg-white/20"
              >
                <Calendar className="h-4.5 w-4.5" />
              </a>
              <a
                href={SITE.affiliate}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("ctaAffiliate")}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 transition-all duration-300 hover:scale-110 hover:bg-white/20"
              >
                <ExternalLink className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white/50">
              {t("navTitle")}
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/75 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white/50">
              {t("platformsTitle")}
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {platforms.map((p) => (
                <li key={p.id}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-white/75 transition-colors hover:text-white"
                  >
                    {p.title}
                    <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} E-MPGT UNIPESSOAL LDA — {t("rights")}
          </p>
          <div className="flex flex-wrap gap-5">
            <Link href="/cgu" className="transition-colors hover:text-white">
              {t("legalTitle")}
            </Link>
            <Link
              href="/cgu-partenaires"
              className="transition-colors hover:text-white"
            >
              {t("partnersTitle")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}