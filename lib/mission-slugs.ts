export const MISSION_SLUGS = [
  "bureaux-neufs",
  "renovation-bureaux",
  "campus-universitaires",
  "laboratoires",
  "gares-ferroviaires",
  "industries",
  "autres",
] as const;

export type MissionSlug = (typeof MISSION_SLUGS)[number];

export type MissionImage = { src: string; title: string };
