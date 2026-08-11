"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Calendar, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { SITE } from "@/lib/site";
import LocaleSwitcher from "./LocaleSwitcher";

type ChildNav = { labelKey: string; href: string; separator?: boolean };
type NavItem = {
  labelKey: string;
  href: string;
  children?: ChildNav[];
};

const NAV_ITEMS: NavItem[] = [
  {
    labelKey: "home",
    href: "/",
    children: [
      { labelKey: "expertises", href: "/expertises" },
      { labelKey: "missions", href: "/nos-missions" },
      { labelKey: "technologies", href: "/technologies" },
      { labelKey: "profils", href: "/profils" },
      { labelKey: "irve", href: "/irve" },
      { labelKey: "about", href: "/a-propos", separator: true },
    ],
  },
  { labelKey: "ecosystem", href: "/#ecosysteme" },
  { labelKey: "partners", href: "/#partenaires" },
  { labelKey: "news", href: "/#actualites" },
  { labelKey: "contact", href: "/contact" },
];

const HOME_CHILDREN = NAV_ITEMS[0].children!;
const HOME_SUB_PATHS = HOME_CHILDREN.map((c) => c.href);

function isLeafActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.includes("#")) return pathname === href.split("#")[0];
  return pathname.startsWith(href);
}

const TOP_LINKS = NAV_ITEMS.filter((item) => !item.children);

export default function Navbar() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [homeMenuOpen, setHomeMenuOpen] = useState(false);
  const [mobileHomeOpen, setMobileHomeOpen] = useState(false);
  const homeRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1280) {
        setMobileOpen(false);
        setMobileHomeOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (homeRef.current && !homeRef.current.contains(e.target as Node)) {
        setHomeMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, []);

  const homeActive = pathname === "/" || HOME_SUB_PATHS.some((p) => pathname.startsWith(p));

  const topLinkClasses = (active: boolean) =>
    `rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 xl:px-4 ${
      active
        ? "bg-primary/8 text-primary"
        : "text-foreground/75 hover:bg-surface hover:text-foreground"
    }`;

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

        <ul className="hidden items-center gap-0.5 xl:flex">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <li key={item.href} ref={homeRef} className="relative">
                <div
                  className={`flex items-center rounded-full transition-colors duration-200 ${
                    homeActive
                      ? "bg-primary/8 text-primary"
                      : "text-foreground/75 hover:bg-surface"
                  }`}
                >
                  <Link
                    href={item.href}
                    onClick={() => setHomeMenuOpen(false)}
                    className="rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 xl:px-4 hover:text-foreground"
                  >
                    {t(item.labelKey)}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setHomeMenuOpen((o) => !o)}
                    aria-label={t("submenu")}
                    aria-haspopup="menu"
                    aria-expanded={homeMenuOpen}
                    className="rounded-full p-2 text-current transition-colors duration-200 hover:bg-primary/10"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        homeMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
                <AnimatePresence>
                  {homeMenuOpen && (
                    <motion.ul
                      role="menu"
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.16 }}
                      className="absolute left-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-border bg-white p-1.5 shadow-xl shadow-black/5"
                    >
                      {item.children.map((child) => (
                        <li key={child.href}>
                          {child.separator && (
                            <div
                              role="separator"
                              className="mx-3 my-1.5 h-px bg-border"
                            />
                          )}
                          <Link
                            href={child.href}
                            onClick={() => setHomeMenuOpen(false)}
                            className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-150 ${
                              isLeafActive(pathname, child.href)
                                ? "bg-primary-soft text-primary"
                                : "text-foreground/80 hover:bg-surface hover:text-foreground"
                            }`}
                          >
                            {t(child.labelKey)}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={item.href}>
                <Link href={item.href} className={topLinkClasses(isLeafActive(pathname, item.href))}>
                  {t(item.labelKey)}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="hidden items-center gap-3 xl:flex">
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

        <div className="flex items-center gap-2 xl:hidden">
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
            className="overflow-hidden border-t border-border bg-white xl:hidden"
          >
            <ul className="flex flex-col gap-1 p-4">
              <li>
                <div
                  className={`flex items-center rounded-xl transition-colors duration-200 ${
                    homeActive
                      ? "bg-primary/8 text-primary"
                      : "text-foreground/85"
                  }`}
                >
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200 hover:bg-surface hover:text-foreground"
                  >
                    {t("home")}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileHomeOpen((o) => !o)}
                    aria-label={t("submenu")}
                    aria-expanded={mobileHomeOpen}
                    className="rounded-xl p-3 text-current transition-colors duration-200 hover:bg-surface hover:text-foreground"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        mobileHomeOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
                <AnimatePresence>
                  {mobileHomeOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-1 space-y-1 border-l-2 border-primary/10 pl-4">
                        {HOME_CHILDREN.map((child) => (
                          <li key={child.href}>
                            {child.separator && (
                              <div role="separator" className="my-2 h-px bg-border" />
                            )}
                            <Link
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className={`block rounded-xl px-4 py-2.5 text-sm font-medium ${
                                isLeafActive(pathname, child.href)
                                  ? "bg-primary-soft text-primary"
                                  : "text-foreground/80 hover:bg-surface hover:text-foreground"
                              }`}
                            >
                              {t(child.labelKey)}
                            </Link>
                          </li>
                        ))}
                      </div>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              {TOP_LINKS.map((link, i) => (
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
                      isLeafActive(pathname, link.href)
                        ? "bg-primary/8 text-primary"
                        : "text-foreground/85 hover:bg-surface hover:text-foreground"
                    }`}
                  >
                    {t(link.labelKey)}
                  </Link>
                </motion.li>
              ))}

              <motion.li
                initial={{ x: -16, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: TOP_LINKS.length * 0.04, duration: 0.25 }}
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