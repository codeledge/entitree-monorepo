import { extractSkipTake } from "./extractSkipTake";
import { extractOrderBy } from "./extractOrderBy";
import { extractWhere } from "./extractWhere";
import { GetListRequest, Response } from "./Http";
import { getWikibaseSparql, getWikidataSparql } from "@entitree/helper";
import { Page } from "../lib/data/types";

export const getListHandler = async <
  W extends {
    include?: object | null;
    orderBy?: object | null;
    select?: object | null;
    skip?: number | null;
    take?: number | null;
    where?: object | null;
  }
>(
  req: GetListRequest,
  res: Response,
  table: Page,
  options?: {
    select?: W["select"];
    include?: W["include"];
    where?: W["where"];
    noNullsOnSort?: string[];
    debug?: boolean;
    transform?: (data: any) => any;
  }
) => {
  const { pagination, sort, filter } = req.body.params;
  const resource = req.body.resource;

  const where = extractWhere(req);
  const { skip, take } = extractSkipTake(req);
  //  OPTIONAL { ?item wdt:P123 ?P123. }

  let sparqlTop = "";
  let sparqlBody = "";
  let query = "";
  let orderBy = "";
  if (sort.field) {
    orderBy = `ORDER BY ${sort.order}(?${sort.field})`;
  }
  //   const query = `SELECT (?item as ?id) ?itemLabel ${sparqlTop}
  // WHERE
  // {
  //   ?item wdt:P31 wd:${table.P31}.
  //   ${table.sparql ? table.sparql : ""}
  //   ${sparqlBody}
  //   SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  // }
  // LIMIT ${take}
  // OFFSET ${skip}
  // `; // ${orderBy}
  console.log(table.header);
  if (table.where) {
    for (let t of table.header) {
      sparqlTop += ` ?${t.property} ?${t.property}Label `;
      sparqlBody += `OPTIONAL { ?item wdt:${t.property} ?${t.property}. }\n`;
    }

    query = `SELECT ?item ?itemLabel ${sparqlTop}
  WHERE
  {
    ${table.where}
    ${sparqlBody}
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  }
  LIMIT ${take}
  OFFSET ${skip}
  `;
  } else {
    query = `
${table.query}
LIMIT ${take}
OFFSET ${skip}
`;
  }
  console.log(query);

  let data = await getWikidataSparql(query);
  data.map((d) => {
    d.id = d.item.value;
    return d;
  });
  const total = 100;
  // console.log(data);
  // await options?.transform?.(data);

  res.json({
    data,
    total,
  });
};
