export type Pages = {
  [key: string]: Page;
};

export type Page = {
  id?: string;
  query?: string;
  where?: string;
  header?: Column[];
  dataset?: any;
  parent?: string;
  list?: string;
  represents?: string;
  example?: any;
  img?: string;
  category?: string;
};

export type Column = {
  name?: string;
  property?: string;
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
};
