import { defineArrayMember, defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons/Cog";

export const contact = defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.email().warning("Email invalide"),
    }),
    defineField({
      name: "phone",
      title: "Téléphone",
      type: "string",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      type: "string",
    }),
    defineField({
      name: "calendly",
      title: "Calendly (URL)",
      type: "url",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"] }).warning("URL doit commencer par http(s)://"),
    }),
    defineField({
      name: "office",
      title: "Bureau / Adresse",
      type: "string",
    }),
    defineField({
      name: "socials",
      title: "Réseaux sociaux",
      type: "array",
      of: [
        defineArrayMember({
          name: "social",
          title: "Réseau",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeText",
    }),
  ],
  preview: {
    select: {
      title: "email",
      subtitle: "office",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Contact (sans email)",
        subtitle: subtitle || "",
      };
    },
  },
});
