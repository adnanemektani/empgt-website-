import { defineField, defineType } from "sanity";
import { LOCALES } from "./localeString";

export const localeText = defineType({
  name: "localeText",
  title: "Texte traduit (long)",
  type: "object",
  fields: LOCALES.map((l) =>
    defineField({
      name: l.name,
      title: l.title,
      type: "text",
      rows: 4,
      validation: (rule) =>
        l.name === "fr"
          ? rule.warning("La version FR est recommandée (fallback sur le site).")
          : rule,
    })
  ),
});
