export const SITE = {
  name: "E-MPGT",
  tagline: "Conseil BTP, sourcing et logistique internationale",
  description:
    "Un partenaire unique pour vos projets, du terrain à la livraison.",
  linkedin: "https://linkedin.com/company/mpgt",
  calendly: "https://calendly.com/tmv_emmanuel/30min",
  affiliate: "https://e-mpgt.tolt.io",
  email: "contact@e-mpgt.com",
};

/**
 * Plateformes externes de l'écosystème E-MPGT.
 * Les URLs sont provisoires (fake) — les plateformes sont en cours de
 * construction. Elles seront remplacées dès leur mise en ligne.
 */
export const PLATFORMS = [
  {
    id: "freelance",
    label: "Plateforme Freelance",
    title: "Profils & Experts BTP",
    short: "Profils",
    description:
      "Accédez à un réseau d'ingénieurs, conducteurs de travaux et experts BTP sélectionnés et validés par nos soins.",
    bullets: [
      "Ingénieurs travaux & directeurs de projets",
      "Conducteurs de travaux, MOE / MOEX / OPC",
      "Profils validés par un pair expérimenté",
      "Disponibles rapidement, France & international",
    ],
    cta: "Accéder aux profils",
    href: "https://profils.empgt.example",
    badge: "Prochainement",
    icon: "users",
  },
  {
    id: "materiel",
    label: "Plateforme Matériel",
    title: "Marketplace Matériel BTP",
    short: "Matériel",
    description:
      "Sourcing de matériel d'occasion, ventes aux enchères européennes et accès aux meilleures opportunités du marché.",
    bullets: [
      "Sourcing auprès de fournisseurs professionnels",
      "Ventes aux enchères européennes accompagnées",
      "Inspection, paiements sécurisés & dédouanement",
      "Logistique internationale clé en main",
    ],
    cta: "Explorer le matériel",
    href: "https://materiel.empgt.example",
    badge: "Prochainement",
    icon: "wrench",
  },
  {
    id: "logistique",
    label: "Plateforme Logistique",
    title: "Logistique & Fret International",
    short: "Logistique",
    description:
      "Solutions express, standards, formalités douanières, entrepôts sous douane et FRET maritime, aérien et terrestre.",
    bullets: [
      "Express & standard internationaux avec suivi",
      "Formalités douanières & entrepôts sous douane",
      "FRET mer, air, terre — de porte à porte",
      "Stockage flexible et traçabilité complète",
    ],
    cta: "Découvrir la logistique",
    href: "https://logistique.empgt.example",
    badge: "Prochainement",
    icon: "truck",
  },
] as const;

export type Platform = (typeof PLATFORMS)[number];
