import { esgProjects } from "@/data/esg-projects";
import { seedImage, type SeedDocument } from "./helpers";

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function documents(): SeedDocument[] {
  return esgProjects.map((project, i) => ({
    _id: `esgProject-${slugify(project.title)}`,
    _type: "esgProject",
    title: project.title,
    category: project.category,
    description: project.description,
    image: seedImage(project.image),
    order: i,
  }));
}
