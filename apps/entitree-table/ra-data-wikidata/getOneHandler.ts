import { getWikidataEntities, getWikidataSparql } from "@entitree/helper";
import { Page } from "../lib/data/types";
import { GetOneRequest, Response } from "./Http";
import { sparqlQueryCreate } from "./sparql";

export const getOneHandler = async <
  W extends {
    include?: object | null;
    select?: object | null;
  }
>(
  req: GetOneRequest,
  res: Response,
  table: Page,

  options?: {
    select?: W["select"];
    include?: W["include"];
    debug?: boolean;
    transform?: (row: any) => any;
  }
) => {
  // const row = await getWikidataEntities([req.body.params.id]);
  if (!req.body.params.id) {
    res.json("No id provided");
    return;
  }
  let sparql = sparqlQueryCreate(table);

  const query = `SELECT ?item ?itemLabel  ${sparql.top}
WHERE 
{
  BIND (wd:${req.body.params.id} AS ?item)
  ${sparql.body}
  ${sparql.labelService}
}
  GROUP BY ?item ?itemLabel 
`;
  console.log(query);
  let rows = await getWikidataSparql(query);
  rows = rows.map((d) => {
    d.id = d.item.value;
    return d;
  });
  const row = rows[0];

  await options?.transform?.(row);

  res.json({ data: row });
};
