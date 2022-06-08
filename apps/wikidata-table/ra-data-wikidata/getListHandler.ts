import { extractSkipTake } from "./extractSkipTake";
import { extractOrderBy } from "./extractOrderBy";
import { extractWhere } from "./extractWhere";
import { GetListRequest, Response } from "./Http";
import { getWikibaseSparql, getWikidataSparql } from "@entitree/helper";
import { Page } from "../lib/data/types";
import { sparqlQueryCreate, sparql } from "./sparql";

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

  console.log(table.header);
  if (!table.where) {
    res.json({ error: "no where clause" });
    return;
  }
  let query = sparqlQueryCreate(table);

  let data: any = await sparql({
    select: "?item",
    where: `${table.where}`,
    take,
    skip,
    // orderBy: sort.field ? `${sort.order}(?${sort.field})` : "",
  });

  let searchIds: string[] = data.map((d) => d.item);

  data = await sparql({
    select: query.top,
    where: `VALUES ?item {wd:${searchIds.join(" wd:")}}
    ${query.body}
    ${query.labelService}`,
    groupBy: "?item ?itemLabel",
    take,
    skip,
    // orderBy: sort.field ? `${sort.order}(?${sort.field})` : "",
  });

  console.log(data);

  //

  //add id for react-admin
  data = data.map((d) => {
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
