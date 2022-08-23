import { z } from "zod";
import {
  getWikidataSparql,
  WD_IATA_AIRPORT_CODE,
  WIKIDATA_ICON,
  WIKIDATA_LABELS_EN,
  WIKIDATA_REGEX,
} from "@entitree/helper";
import { createRouter } from "../createRouter";

export const wikidataRouter = createRouter()
  .query("getEnLabels", {
    meta: {
      openapi: {
        enabled: true,
        method: "GET",
        path: "/getEnLabels",
        tags: ["wikidata"],
        summary: "Get Wikidata labels of every property",
      },
    },
    input: z.void(),
    output: z.object({
      labels: z.record(z.string(), z.string()),
    }),
    resolve: () => {
      const labels = WIKIDATA_LABELS_EN;
      return { labels };
    },
  })
  .query("getProperty", {
    meta: {
      openapi: {
        enabled: true,
        method: "GET",
        path: "/getProperty",
        tags: ["wikidata"],
        summary: "Get Wikidata labels of every property",
      },
    },
    input: z.object({
      property: z.string().regex(/^P/),
    }),
    output: z.object({
      label: z.string().nullable(),
      icon: z.string().nullable(),
      regex: z.string().nullable(),
    }),
    resolve: ({ input: { property } }) => {
      const output = {
        label: WIKIDATA_LABELS_EN[property] ?? null,
        icon: WIKIDATA_ICON[property] ?? null,
        regex: WIKIDATA_REGEX[property] ?? null,
      };
      return output;
    },
  })
  .query("getAirlineByIATACode", {
    meta: {
      openapi: {
        enabled: true,
        method: "GET",
        path: "/getAirlineByIATACode",
        tags: ["wikidata"],
        summary: "Get Airline info based on IATA Code",
      },
    },
    input: z.object({
      code: z.string().regex(new RegExp(WIKIDATA_REGEX[WD_IATA_AIRPORT_CODE])),
    }),
    output: z.any(),
    resolve: async ({ input: { code } }) => {
      const query = await getWikidataSparql(`
        SELECT ?wikipedia ?item ?itemLabel (group_concat(DISTINCT ?P239_;separator=", ") as ?P239 ) (group_concat(DISTINCT ?P238_;separator=", ") as ?P238 ) (group_concat(DISTINCT ?P17_;separator=", ") as ?P17 ) (group_concat(DISTINCT ?P17Label_;separator=", ") as ?P17Label ) 
(group_concat(DISTINCT ?P931_;separator=", ") as ?P931 ) (group_concat(DISTINCT ?P931Label_;separator=", ") as ?P931Label ) 
(group_concat(DISTINCT ?P1619_;separator=", ") as ?P1619 ) (group_concat(DISTINCT ?P18_;separator=", ") as ?P18 ) 
  WHERE
  {
    ?item wdt:P31/wdt:P279* wd:Q1248784.
   ?item wdt:P238 "${code}".

    OPTIONAL { ?item wdt:P239 ?P239_. }
OPTIONAL { ?item wdt:P17 ?P17_. }
OPTIONAL { ?item wdt:P931 ?P931_. }
OPTIONAL { ?item wdt:P1619 ?P1619_. }
OPTIONAL { ?item wdt:P18 ?P18_. }

    
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en,de,id".
    ?item rdfs:label ?itemLabel.
    ?P17_ rdfs:label ?P17Label_ .
?P931_ rdfs:label ?P931Label_ .

  }
     OPTIONAL{ ?sitelink schema:about ?item;
    schema:isPartOf <https://en.wikipedia.org/>;
    schema:name ?wikipedia. }
    
  }  
  GROUP BY ?item ?itemLabel ?wikipedia

      `);
      return query[0];
    },
  });
