import {
  getCommonsUrlByFile,
  getWikidataEntities,
  getWikidataSparql,
} from "@entitree/helper";
import { Page } from "../lib/data/types";
import { GetOneRequest, Response } from "./Http";
import { sparql, sparqlQueryCreate } from "./sparql";

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
  let query = sparqlQueryCreate(table);

  let rows = await sparql({
    select: query.top,
    where: `VALUES ?item {wd:${req.body.params.id}}
    ${query.body}
    ${query.labelService}`,
    groupBy: "?item ?itemLabel",
  });

  rows = rows.map((d) => {
    d.id = d.item.value;
    if (d.P18.label) {
      d.P18.label = getCommonsUrlByFile(d.P18.label, 400);
    }
    return d;
  });

  const row = rows[0];

  await options?.transform?.(row);

  res.json({ data: row });
};
