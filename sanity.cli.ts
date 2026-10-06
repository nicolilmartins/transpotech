import { defineCliConfig } from "sanity/cli";
import { SANITY_DATASET, SANITY_PROJECT_ID } from "./src/sanity/env";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || SANITY_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || SANITY_DATASET,
  },
  studioHost: "transpotech",
});
