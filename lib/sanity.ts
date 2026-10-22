import { createClient } from "@sanity/client";
import { isYoutubeHref, youtubeThumb } from "@/lib/news";

export const SANITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "wwzbgktd";
export const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
});

export type SanityNews = {
  title: string;
  source: string;
  href: string;
  image: string | null;
  isVideo: boolean;
  date: string;
};

const NEWS_QUERY = `*[_type == "news"] | order(coalesce(order, 0) asc, date desc) {
  titles,
  source,
  href,
  externalImage,
  date,
  "imageUrl": image.asset->url
}`;

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}

export async function fetchSanityNews(locale: string): Promise<SanityNews[]> {
  const docs: {
    titles?: { fr?: string; en?: string; ar?: string; zh?: string; pt?: string };
    source?: string;
    href?: string;
    externalImage?: string;
    date?: string;
    imageUrl?: string | null;
  }[] = await sanityClient.fetch(NEWS_QUERY);

  return docs.map((doc) => {
    const href = doc.href ?? "";
    const isVideo = isYoutubeHref(href);
    const image =
      doc.imageUrl ??
      doc.externalImage ??
      (isVideo ? youtubeThumb(href) : null);
    return {
      title: doc.titles?.[locale as "en"] ?? doc.titles?.fr ?? "E-MPGT",
      source: doc.source || "E-MPGT",
      href,
      image,
      isVideo,
      date: formatDate(doc.date),
    };
  });
}

export type SanityMissionPhoto = { src: string; title: string };

export type SanityMission = {
  slug: string;
  photos: SanityMissionPhoto[];
};

const MISSION_QUERY = `*[_type == "missionSection"] | order(order asc) {
  "slug": slug.current,
  "photos": photos[] {
    title,
    "src": image.asset->url,
    "alt": image.alt
  }
}`;

export async function fetchSanityMissions(locale: string): Promise<SanityMission[]> {
  const docs: {
    slug?: string;
    photos?: {
      title?: { fr?: string; en?: string; ar?: string; zh?: string; pt?: string };
      src?: string | null;
    }[];
  }[] = await sanityClient.fetch(MISSION_QUERY);

  return docs.map((doc) => ({
    slug: doc.slug ?? "",
    photos: (doc.photos ?? [])
      .filter((p) => p.src)
      .map((p) => ({
        src: p.src as string,
        title: p.title?.[locale as "en"] ?? p.title?.fr ?? "E-MPGT",
      })),
  }));
}

export type SanityContact = {
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  calendly: string | null;
  office: string | null;
  socials: { label: string; url: string }[];
  description: string | null;
};

/**
 * Document unique `contact` (id : « contact ») —'il remplace les coordonnées
 * codées en dur dans `lib/site.ts`. Retourne `null` si le document n'existe pas
 * encore : le site retombe alors sur les valeurs par défaut.
 */
const CONTACT_QUERY = `*[_type == "contact" && _id == "contact"][0]{
  email,
  phone,
  whatsapp,
  calendly,
  office,
  socials[]{label, url},
  description
}`;

export async function fetchSanityContact(): Promise<SanityContact | null> {
  let doc: {
    email?: string;
    phone?: string;
    whatsapp?: string;
    calendly?: string;
    office?: string;
    socials?: { label?: string; url?: string }[];
    description?: string;
  } | null = null;

  try {
    doc = await sanityClient.fetch(CONTACT_QUERY);
  } catch {
    return null;
  }

  if (!doc) return null;

  return {
    email: doc.email || null,
    phone: doc.phone || null,
    whatsapp: doc.whatsapp || null,
    calendly: doc.calendly || null,
    office: doc.office || null,
    socials: (doc.socials ?? [])
      .filter((s) => s.url)
      .map((s) => ({ label: s.label || "", url: s.url as string })),
    description: doc.description || null,
  };
}
