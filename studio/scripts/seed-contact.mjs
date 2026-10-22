import { createClient } from "@sanity/client";

/**
 * Crée (ou met à jour) le document unique `contact` dans Sanity.
 *
 * Usage :
 *   SANITY_TOKEN=sk... node studio/scripts/seed-contact.mjs
 *
 * Le token doit avoir les droits d'écriture sur le dataset.
 * Les valeurs par défaut reprennent celles codées en dur dans `lib/site.ts`
 * — modifiez-les ici ou directement dans le Studio une fois le document créé.
 */

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "wwzbgktd";
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN;

if (!token) {
  console.error("Missing SANITY_TOKEN (write access). Set it before running.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const contact = {
  _id: "contact",
  _type: "contact",
  email: "contact@e-mpgt.com",
  phone: "",
  whatsapp: "",
  calendly: "https://calendly.com/tmv_emmanuel/30min",
  office: "73 Avenida Arriaga, 9004-533 Funchal, Madère, Portugal",
  socials: [
    { _key: "linkedin", label: "LinkedIn", url: "https://linkedin.com/company/mpgt" },
    { _key: "affiliate", label: "Affiliation", url: "https://e-mpgt.tolt.io" },
  ],
};

const existing = await client.getDocument("contact").catch(() => null);

if (existing) {
  await client.patch("contact").set(contact).commit();
  console.log("✓ Document `contact` mis à jour.");
} else {
  await client.create(contact);
  console.log("✓ Document `contact` créé.");
}

console.log(`  → ${projectId}/${dataset}/contact`);
