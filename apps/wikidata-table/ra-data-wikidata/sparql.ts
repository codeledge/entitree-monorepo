import { getWikidataSparql, WIKIDATA_TYPE } from "@entitree/helper";
import { Page } from "../lib/data/types";
import { SPARQL_SEPARATOR } from "./const";

export const sparql = async ({
  select,
  where,
  groupBy,
  orderBy,
  take,
  skip,
}: {
  select: string;
  where?: string;
  groupBy?: string;
  take?: number;
  skip?: number;
  orderBy?: string;
}) => {
  let query = `#wikidata-table query v1
  SELECT ${select}
  WHERE
  {
    ${where}
  }  
  ${groupBy ? `GROUP BY ${groupBy}\n` : ""}
  ${orderBy ? `ORDER BY ${orderBy}\n` : ""}
  ${take ? `LIMIT ${take}\n` : ""}
  ${skip ? `OFFSET ${skip}\n` : ""}
  `;
  console.log(query);

  let data: any = await getWikidataSparql(query);
  return data;
};

function gc(id) {
  return `(group_concat(DISTINCT ?${id}_;separator="${SPARQL_SEPARATOR}") as ?${id} ) `;
}
export const sparqlQueryCreate = (table: Page) => {
  let r = {
    top: "?item ?itemLabel ",
    body: "",
    label: "",
    labelService: "",
  };
  for (let t of table.header) {
    // sparqlTop += ` ?${t.property} ?${t.property}Label `;
    r.top += gc(t.property);
    r.body += `OPTIONAL { ?item wdt:${t.property} ?${t.property}_. }\n`;

    //Only check label if the property is of item type
    if (WIKIDATA_TYPE[t.property] === "WikibaseItem") {
      r.top += gc(t.property + "Label") + "\n";
      r.label += `?${t.property}_ rdfs:label ?${t.property}Label_ .\n`;
    }
  }
  r.labelService = `
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en".
    ?item rdfs:label ?itemLabel.
    ${r.label}
  }`;
  return r;
};

// const groupBy = <T>(array: T[], predicate: (v: T) => string) =>
//   array.reduce((acc, value) => {
//     (acc[predicate(value)] ||= []).push(value);
//     return acc;
//   }, {} as { [key: string]: T[] });

// let result = groupBy(data, (v: any) => v.id);
// let res2 = [];
// for (let i of Object.values(result)) {
// }

// all ine onemptied
//   data = await sparql({
//     select: query.top,
//     where: `${table.where}
//     ${query.body}
//     ${query.labelService}`,
//     groupBy: "?item ?itemLabel",
//     take,
//     skip,
//     orderBy: sort.field ? `${sort.order}(?${sort.field})` : "",
//   });
