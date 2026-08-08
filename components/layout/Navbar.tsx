"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { SITE } from "@/lib/site";
import LocaleSwitcher from "./LocaleSwitcher";

const NAV_KEYS = [
  { key: "about", href: "/a-propos" },
  { key: "ecosystem", href: "/#ecosysteme" },
  { key: "metiers", href: "/#metiers" },
  { key: "partners", href: "/#partenaires" },
  { key: "news", href: "/#actualites" },
  { key: "contact", href: "/contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.includes("#")) return pathname === href.split("#")[0];
  return pathname.startsWith(href);
}

export default function Navbar() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navLinks = NAV_KEYS.map((item) => ({
    ...item,
    label: t(item.key),
  }));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-border bg-white/95 shadow-sm backdrop-blur-md"
          : "border-transparent bg-white"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-85"
          aria-label={t("logoAlt")}
        >
          <Image
            src="/logos/empgt-logo-transparent.png"
            alt="E-MPGT"
            width={140}
            height={44}
            priority
            className="h-10 w-auto object-contain"
          />
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 xl:px-4 ${
                  isActive(pathname, link.href)
                    ? "bg-primary/8 text-primary"
                    : "text-foreground/75 hover:bg-surface hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher />
          <a
            href={SITE.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-md"
          >
            <Calendar className="h-4 w-4" />
            {t("cta")}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LocaleSwitcher />
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="flex items-center justify-center rounded-full p-2 text-foreground"
            aria-label={t("openMenu")}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border bg-white lg:hidden"
          >
            <ul className="flex flex-col gap-1 p-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-base font-medium ${
                      isActive(pathname, link.href)
                        ? "bg-primary/8 text-primary"
                        : "text-foreground/85 hover:bg-surface hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ x: -16, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.04, duration: 0.25 }}
                className="mt-2"
              >
                <a
                  href={SITE.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-center text-sm font-semibold text-accent-foreground"
                >
                  <Calendar className="h-4 w-4" />
                  {t("cta")}
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}