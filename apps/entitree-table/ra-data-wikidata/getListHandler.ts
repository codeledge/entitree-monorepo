import { extractSkipTake } from "./extractSkipTake";
import { extractOrderBy } from "./extractOrderBy";
import { extractWhere } from "./extractWhere";
import { GetListRequest, Response } from "./Http";
import { getWikibaseSparql, getWikidataSparql } from "@entitree/helper";
import { Page } from "../lib/data/types";
import { sparqlQueryCreate } from "./sparql";

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

  let query = "";
  let orderBy = "";
  if (sort.field) {
    orderBy = `ORDER BY ${sort.order}(?${sort.field})`;
  }
  console.log(table.header);
  if (table.where) {
    let sparql = sparqlQueryCreate(table);

    query = `SELECT ?item ?itemLabel ${sparql.top}
  WHERE
  {
    ${table.where}
    ${sparql.body}
    ${sparql.labelService}
  }
  GROUP BY ?item ?itemLabel 
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

  let data: any = await getWikidataSparql(query);
  console.log(data);

  // const groupBy = <T>(array: T[], predicate: (v: T) => string) =>
  //   array.reduce((acc, value) => {
  //     (acc[predicate(value)] ||= []).push(value);
  //     return acc;
  //   }, {} as { [key: string]: T[] });

  data = data.map((d) => {
    d.id = d.item.value;
    return d;
  });

  // let result = groupBy(data, (v: any) => v.id);
  // let res2 = [];
  // for (let i of Object.values(result)) {
  // }

  const total = 100;
  // console.log(data);
  // await options?.transform?.(data);

  res.json({
    data,
    total,
  });
};
