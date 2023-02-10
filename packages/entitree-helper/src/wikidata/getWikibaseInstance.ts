import { WBK } from "wikibase-sdk";
import { Wbk } from "wikibase-sdk/dist/types/wbk";

export type DataSource = "wikidata" | "factgrid" | "geni";

const wikibaseInstances: Record< "wikidata" | "factgrid", Wbk> = {
  wikidata: WBK({
    instance: "https://www.wikidata.org",
    sparqlEndpoint: "https://query.wikidata.org/sparql",
  }),
  factgrid: WBK({
    instance: "https://database.factgrid.de",
    sparqlEndpoint: "https://database.factgrid.de/sparql",
  }),
};

export const wdk = wikibaseInstances.wikidata;
