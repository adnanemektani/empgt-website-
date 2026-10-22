import { createClient } from "@sanity/client";

/**
 * Accès Sanity en ÉCRITURE — uniquement côté serveur.
 *
 * ⚠️ Ne jamais importer ce module depuis un composant client :
 * le token `SANITY_API_TOKEN` n'est pas exposé au navigateur
 * (il ne porte pas le préfixe `NEXT_PUBLIC_`), et la garde ci-dessous
 * lève une erreur si le module finit dans le bundle navigateur.
 */

export const SANITY_WRITE_PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "wwzbgktd";
export const SANITY_WRITE_DATASET =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (typeof window !== "undefined") {
  throw new Error(
    "lib/sanity-write.ts est un module serveur — il ne doit pas être importé depuis un composant client."
  );
}

export type ContactSubmissionInput = {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  locale?: string;
};

export function getSanityWriteClient() {
  const token = process.env.SANITY_API_TOKEN || process.env.SANITY_TOKEN;
  if (!token) {
    throw new Error(
      "SANITY_API_TOKEN manquant — ajoutez un token d'écriture Sanity dans .env.local"
    );
  }
  return createClient({
    projectId: SANITY_WRITE_PROJECT_ID,
    dataset: SANITY_WRITE_DATASET,
    token,
    apiVersion: "2024-01-01",
    useCdn: false,
  });
}

/** Enregistre une demande de contact dans Sanity (type `contactSubmission`). */
export async function createContactSubmission(input: ContactSubmissionInput) {
  const client = getSanityWriteClient();

  const doc = {
    _type: "contactSubmission",
    name: input.name,
    email: input.email,
    company: input.company || undefined,
    subject: input.subject,
    message: input.message,
    locale: input.locale || undefined,
    read: false,
    createdAt: new Date().toISOString(),
  };

  return client.create(doc);
}
