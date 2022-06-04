export type WikidataPropertyDatatype =
  | "CommonsMedia"
  | "ExternalId"
  | "GeoShape"
  | "GlobeCoordinate"
  | "Math"
  | "Monolingualtext"
  | "MusicalNotation"
  | "Quantity"
  | "String"
  | "TabularData"
  | "Time"
  | "Url"
  | "WikibaseItem"
  | "WikibaseProperty"
  | "WikibaseLexeme"
  | "WikibaseForm"
  | "WikibaseSense";

export type WikidataPropertyTypesConstants = {
  [key: string]: WikidataPropertyDatatype;
};
