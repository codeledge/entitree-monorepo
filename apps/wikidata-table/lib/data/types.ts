import { WikidataPropertyDatatype } from "@entitree/helper";

export type Pages = {
  [key: string]: Page;
};

export const PageCategories = [
  "aviation",
  "education",
  "medicine",
  "science",
  "technology",
  "entertainment",
  "finance",
  "other",
  "traveling",
];

export type Page = {
  id?: string;
  query?: string;
  where?: string;
  header?: Column[];
  dataset?: any;
  parent?: string;
  list?: string;
  represents: string | null;
  example?: any;
  img?: string;
  emoji?: string;
  muiEmoji?: string;
  category?:
    | "aviation"
    | "education"
    | "medicine"
    | "science"
    | "technology"
    | "entertainment"
    | "finance"
    | "other"
    | "traveling";
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
