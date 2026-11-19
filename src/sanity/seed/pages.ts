import { documentTypeOf, type Section } from "../content/fields";
import { defaultValues } from "../content/merge";
import { pages } from "../content/pages";
import { seedFields } from "../content/seed";
import type { SeedDocument } from "./helpers";

export function documents(): SeedDocument[] {
  return pages.map((page) => {
    const type = documentTypeOf(page.key);
    const sections = Object.fromEntries(
      Object.entries(page.sections as Record<string, Section>).map(([name, section]) => [
        name,
        seedFields(section.fields, defaultValues(section.fields)),
      ]),
    );
    return { _id: type, _type: type, ...sections };
  });
}
