export type FacetKey =
  | "brand"
  | "equipmentType"
  | "energyTag"
  | "capacity"
  | "application"
  | "availability"
  | "location";

export type FacetGroup = {
  key: FacetKey;
  label: string;
  options: string[];
  defaultOpen?: boolean;
};

export type SelectedFacets = Record<FacetKey, string[]>;

export type SortKey = "relevance" | "name" | "brand";
