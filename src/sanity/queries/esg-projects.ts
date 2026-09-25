import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/client";
import { imageProjection } from "@/sanity/image";
import { esgProjects, type EsgProject } from "@/data/esg-projects";

const esgProjectsQuery =
  defineQuery(`*[_type == "esgProject"] | order(order asc){
  title,
  category,
  description,
  "image": image${imageProjection}
}`);

export async function getEsgProjects(): Promise<EsgProject[]> {
  const projects = await sanityFetch<EsgProject[]>({
    query: esgProjectsQuery,
    tags: ["esgProject"],
  });
  return projects ?? esgProjects;
}
