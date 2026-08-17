export const MISSION_SLUGS = [
  "bureaux-neufs",
  "laboratoires",
  "gares-ferroviaires",
  "renovation-bureaux",
  "campus-universitaires",
  "industries",
  "autres",
] as const;

export type MissionSlug = (typeof MISSION_SLUGS)[number];

export type MissionImage = { src: string; title: string };
