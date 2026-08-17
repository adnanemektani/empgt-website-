import { defineField, defineType } from "sanity";

export const LOCALES = [
  { name: "fr", title: "Français" },
  { name: "en", title: "English" },
  { name: "ar", title: "العربية" },
  { name: "zh", title: "中文" },
  { name: "pt", title: "Português" },
];

export const localeString = defineType({
  name: "localeString",
  title: "Texte traduit (court)",
  type: "object",
  fields: LOCALES.map((l) =>
    defineField({
      name: l.name,
      title: l.title,
      type: "string",
      validation: (rule) =>
        l.name === "fr"
          ? rule.warning("La version FR est recommandée (fallback sur le site).")
          : rule,
    })
  ),
});
