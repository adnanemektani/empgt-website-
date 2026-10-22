import { defineField, defineType } from "sanity";
import { EnvelopeIcon } from "@sanity/icons/Envelope";

/**
 * Demandes de contact envoyées via le formulaire du site (app/api/contact).
 * Les valeurs de `subject` correspondent aux clés de `Contact.subjects.*`
 * dans `messages/{locale}.json`.
 */
const SUBJECT_OPTIONS = [
  { title: "Conseil BTP & Ingénierie", value: "btp" },
  { title: "Sourcing matériel", value: "materiel" },
  { title: "Logistique & fret", value: "logistique" },
  { title: "Partenariat / Affiliation", value: "partenariat" },
  { title: "Autre demande", value: "autre" },
];

const LOCALE_OPTIONS = [
  { title: "Français", value: "fr" },
  { title: "English", value: "en" },
  { title: "العربية", value: "ar" },
  { title: "中文", value: "zh" },
  { title: "Português", value: "pt" },
];

export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "Demande de contact",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nom complet",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "email",
      title: "E-mail",
      type: "string",
      validation: (rule) => rule.required().email().max(200),
    }),
    defineField({
      name: "company",
      title: "Société",
      type: "string",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "subject",
      title: "Sujet",
      type: "string",
      options: { list: SUBJECT_OPTIONS },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 8,
      validation: (rule) => rule.required().max(4000),
    }),
    defineField({
      name: "locale",
      title: "Langue du formulaire",
      type: "string",
      options: { list: LOCALE_OPTIONS },
    }),
    defineField({
      name: "read",
      title: "Traité",
      type: "boolean",
      initialValue: false,
      description: "Cochez cette case une fois la demande traitée.",
    }),
    defineField({
      name: "createdAt",
      title: "Reçu le",
      type: "datetime",
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "Plus récentes d'abord",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      company: "company",
      read: "read",
    },
    prepare({ title, subtitle, company, read }) {
      const label = company ? `${title} — ${company}` : title;
      return {
        title: read ? label : `● ${label || "Sans nom"}`,
        subtitle: subtitle || "",
      };
    },
  },
});
