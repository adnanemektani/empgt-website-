import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { schemaTypes } from "./schemaTypes";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "wwzbgktd";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "E-MPGT",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("E-MPGT")
          .items([
            S.listItem()
              .title("Contact")
              .schemaType("contact")
              .child(
                S.document()
                  .schemaType("contact")
                  .documentId("contact")
                  .title("Contact")
              ),
            S.divider(),
            S.listItem()
              .title("Demandes de contact")
              .icon(EnvelopeIcon)
              .child(
                S.documentTypeList("contactSubmission")
                  .title("Demandes de contact")
                  .defaultOrdering([{ field: "createdAt", direction: "desc" }])
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) =>
                !["contact", "contactSubmission"].includes(item.getId() ?? "")
            ),
          ]),
    }),
  ],
  document: {
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter((item) => item.templateId !== "contact")
        : prev,
  },
  schema: {
    types: schemaTypes,
  },
});
