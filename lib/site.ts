export const SITE = {
  name: "E-MPGT",
  linkedin: "https://linkedin.com/company/mpgt",
  calendly: "https://calendly.com/tmv_emmanuel/30min",
  affiliate: "https://e-mpgt.tolt.io",
  email: "contact@e-mpgt.com",
};

/**
 * Plateformes externes de l'écosystème E-MPGT.
 * Les URLs sont provisoires (fake) — les plateformes sont en cours de
 * construction. Elles seront remplacées dès leur mise en ligne.
 * Les textes affichés proviennent des fichiers `messages/{locale}.json`.
 */
export const PLATFORMS = [
  {
    id: "freelance",
    href: "https://profils.empgt.example",
    icon: "users",
  },
  {
    id: "materiel",
    href: "https://materiel.empgt.example",
    icon: "wrench",
  },
  {
    id: "logistique",
    href: "https://logistique.empgt.example",
    icon: "truck",
  },
] as const;

export type Platform = (typeof PLATFORMS)[number];