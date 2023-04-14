import { WikidataPropertyDatatype } from "@entitree/helper";
import React from "react";

export type Pages = {
  [key: string]: Page;
};

export const PageCategories = [
  "aviation",
  "education",
  "medicine",
  "technology",
  "entertainment",
  "finance",
  "other",
  "traveling",
  "podcast",
  "politics",
] as const;

export type Page = {
  id?: string;
  query?: string;
  where?: string;
  filter?: Record<string, string>;
  header?: Column[];
  dataset?: any;
  parent?: string;
  list?: string;
  represents: string | null;
  example?: any;
  img?: string;
  emoji?: string;
  muiEmoji?: string;
  refine?: string;
  excludeOld?: boolean;
  filterButtons?: any[];
  sidebarJsx?: JSX.Element;
  category: (typeof PageCategories)[number];
};

export type Column = {
  name?: string;
  property?: string;
  propertyType?: WikidataPropertyDatatype;
  url?: string;
  visible?: boolean;
  sortable?: boolean;
  orderable?: boolean;
  maxlength?: number;
  ellipsis?: any;
  valueconstraint?: any;
  options?: any;
  hidden?: boolean;
  width?: string;
  type?: string;
  render?: string;
  sort?: string;
  link?: string;
  description?: string;
  formatterurl?: string;
  multiple?: boolean;
  getqualifiers?: any;
  list?: boolean;
};
