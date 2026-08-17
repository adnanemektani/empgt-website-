import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";

export const news = defineType({
  name: "news",
  title: "Actualité",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "titles",
      title: "Titres",
      type: "localeString",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "titles.fr" },
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
    }),
    defineField({
      name: "href",
      title: "Lien (URL)",
      type: "url",
      validation: (rule) =>
        rule
          .required()
          .uri({ scheme: ["http", "https"] })
          .error("URL obligatoire commençant par http(s)://"),
    }),
    defineField({
      name: "image",
      title: "Image (upload)",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texte alternatif",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "externalImage",
      title: "Image externe (URL)",
      type: "url",
      description:
        "Alternative à l'upload : collez ici l'URL directe d'une image (ex. miniature).",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"] }).warning("URL doit commencer par http(s)://"),
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      description: "Plus petit d'abord. Vide = affichage par date.",
    }),
  ],
  preview: {
    select: {
      title: "titles.fr",
      subtitle: "source",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Actualité sans titre FR",
        subtitle: subtitle || "",
        media,
      };
    },
  },
});
