import Link from "next/link";
import Image from "next/image";
import { Calendar, ExternalLink } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/BrandIcons";
import { SITE, PLATFORMS } from "@/lib/site";

const NAV = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Écosystème", href: "/#ecosysteme" },
  { label: "Actualités", href: "/#actualites" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
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
                <p className="text-xs text-white/60">Groupe MPGT — Portugal · France · Maroc · Côte d'Ivoire</p>
              </div>
            </Link>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">
              {SITE.tagline}. 25 ans d&apos;expertise terrain au service de vos
              projets, du terrain à la livraison.
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
                aria-label="Prendre rendez-vous en visio"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 transition-all duration-300 hover:scale-110 hover:bg-white/20"
              >
                <Calendar className="h-4.5 w-4.5" />
              </a>
              <a
                href={SITE.affiliate}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Partenaires affiliés"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 transition-all duration-300 hover:scale-110 hover:bg-white/20"
              >
                <ExternalLink className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Navigation
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV.map((item) => (
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
              Plateformes
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {PLATFORMS.map((p) => (
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
          <p>© {new Date().getFullYear()} E-MPGT UNIPESSOAL LDA — Tous droits réservés.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/cgu" className="transition-colors hover:text-white">
              Conditions générales de service
            </Link>
            <Link href="/cgu-partenaires" className="transition-colors hover:text-white">
              Programme Partenaires
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
