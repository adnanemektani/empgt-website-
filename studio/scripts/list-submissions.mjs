import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "wwzbgktd",
  dataset: "production",
  token: process.env.SANITY_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const docs = await client.fetch(
  `*[_type == "contactSubmission"]{_id, name, email, createdAt}`
);
console.log("Demandes de contact actuelles :");
for (const d of docs) console.log("  ", d._id, "|", d.name, "|", d.email, "|", d.createdAt);

if (process.argv.includes("--purge")) {
  for (const d of docs) {
    await client.delete(d._id);
    console.log("  supprimé :", d._id);
  }
  console.log("✓ Toutes les demandes de test ont été supprimées.");
}
