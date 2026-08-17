import { defineArrayMember, defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons/Image";

export const missionSection = defineType({
  name: "missionSection",
  title: "Section de missions",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nom de la section",
      type: "localeString",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name.fr" },
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      description: "1, 2, 3… pour ordonner les 7 sections.",
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      of: [
        defineArrayMember({
          name: "photo",
          title: "Photo",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Titre",
              type: "localeString",
            }),
            defineField({
              name: "image",
              title: "Image",
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
          ],
          preview: {
            select: {
              title: "title.fr",
              subtitle: "title.en",
              media: "image",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || "Photo sans titre FR",
                subtitle: subtitle || "",
                media,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name.fr",
      subtitle: "order",
      media: "photos.0.image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Section sans nom FR",
        subtitle: subtitle ? `Ordre ${subtitle}` : "",
        media,
      };
    },
  },
});
