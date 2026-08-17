import { defineCliConfig } from "sanity/cli";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "wwzbgktd";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
});
