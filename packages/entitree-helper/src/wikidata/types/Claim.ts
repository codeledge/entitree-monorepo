import { PropertySnacks } from "./PropertyClaims";

export declare type ClaimRank = "normal" | "preferred" | "deprecated";

// export type WikidataPropertyDatatypeSnakeCase =
//   | "commons-media"
//   | "external-id"
//   | "geo-shape"
//   | "coordinate"
//   | "Math"
//   | "Monolingualtext"
//   | "MusicalNotation"
//   | "Quantity"
//   | "String"
//   | "TabularData"
//   | "Time"
//   | "Url"
//   | "WikibaseItem"
//   | "WikibaseProperty"
//   | "WikibaseLexeme"
//   | "WikibaseForm"
//   | "WikibaseSense";

export type Item = string;

export type Claim<Type> = {
  id: string;
  mainsnak: ClaimSnak<Type>;
  rank: ClaimRank;
  type: "statement";
  qualifiers?: PropertySnacks;
  "qualifiers-order"?: string[];
  references?: ClaimReference[];
};

export type ClaimSnak<Type> = {
  datatype: string;
  datavalue?: Type;
  hash: string;
  property: string;
  snaktype: string;
};

// export declare type ClaimSnakValue =
//   | ClaimSnakTimeValue
//   | ClaimSnakEntityValue
//   | ClaimSnakTextValue;

export type ClaimSnakMonolingualtext = {
  type: "monolingualtext";
  value: {
    text: string;
    language: string;
  };
};

export type ClaimSnakTime = {
  type: "time";
  value: {
    after: number;
    before: number;
    calendarmodel: string;
    precision: number;
    time: string;
    timezone: number;
  };
};

export type ClaimSnakWikibaseItem = {
  type: "wikibase-entityid";
  value: {
    id: Item;
    "numeric-id": number;
    "entity-type": string;
  };
};

export type ClaimSnakQuantity = {
  type: "quantity";
  value: {
    amount: string;
    unit: Item;
    upperBound?: string;
    lowerBound?: string;
  };
};

export type ClaimSnakString = {
  type: "string";
  value: string;
};

export type ClaimSnakExternalId = ClaimSnakString;
export type ClaimSnakCommonsMedia = ClaimSnakString;
export type ClaimSnakUrl = ClaimSnakString;
export type ClaimSnakWikibaseProperty = ClaimSnakWikibaseItem; //TODO
export type ClaimSnakTabularData = any;
export type ClaimSnakWikibaseLexeme = any;
export type ClaimSnakWikibaseSense = any;
export type ClaimSnakWikibaseMath = any;
export type ClaimSnakMusicalNotation = any;
export type ClaimSnakWikibaseForm = any;
export type ClaimSnakGlobeCoordinate = {
  value: {
    latitude: number;
    longitude: number;
    altitude: number | null;
    precision: number;
    globe: string;
  };
  type: "globecoordinate";
};
export type ClaimSnakMath = any;
export type ClaimSnakGeoShape = any;

export type ClaimReference = {
  hash: string;
  snaks: PropertySnacks;
  "snaks-order": string[];
};
