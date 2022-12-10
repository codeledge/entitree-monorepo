import { extractSkipTake } from "./extractSkipTake";
import { extractOrderBy } from "./extractOrderBy";
import { extractWhere } from "./extractWhere";
import { GetListRequest, Response } from "./Http";
import {
  getCommonsUrlByFile,
  getWikibaseSparql,
  getWikidataSparql,
} from "@entitree/helper";
import { Page } from "../lib/data/types";
import { sparqlQueryCreate, sparql } from "./sparql";
import { SPARQL_SEPARATOR } from "./const";

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
  let { pagination, sort, filter } = req.body.params;
  const resource = req.body.resource;

  const where = extractWhere(req);
  const { skip, take } = extractSkipTake(req);

  console.log({ skip, take }, table.header);
  if (!table.where) {
    res.json({ error: "no where clause" });
    return;
  }
  let query = sparqlQueryCreate(table);

  //Add filter from page data
  if (table.filter) {
    filter = { ...filter, ...table.filter };
  }

  let queryFilter = "";
  if (filter) {
    for (let key in filter) {
      if (filter[key]) {
        if (key == "item") {
          queryFilter += `?item rdfs:label ?itemLabel .       
                             FILTER (lang(?itemLabel) = 'en')     
                             FILTER(contains(str(?itemLabel),'${filter[key]}' ))`;
        } else {
          queryFilter += `?item wdt:${key} wd:${filter[key]}.\n`;
        }
      }
    }
  }

  let orderBy = "";
  if (sort) {
    sort.field = sort.field.split(".")[0];
    if (sort.field === "id") {
      sort.field = "item";
    } else {
      orderBy = sort.field ? `${sort.order}(?${sort.field}_)` : "";
    }
  }

  let data: any = await sparql({
    select: "?item",
    where: `${table.where}
    ${
      sort.field && sort.field !== "item"
        ? `OPTIONAL { ?item wdt:${sort.field} ?${sort.field}_. }`
        : ""
    }
    ${queryFilter}`,
    take: take + 1,
    skip,
    orderBy,
  });

  let hasNextPage = false;
  if (data.length > take) {
    hasNextPage = true;
  }
  let searchIds: string[] = data.slice(0, take).map((d) => d.item);

  if (searchIds.length) {
    data = await sparql({
      select: "?wikipedia " + query.top,
      where: `VALUES ?item {wd:${searchIds.join(" wd:")}}
    ${query.body}
    ${query.labelService}
     OPTIONAL{ ?sitelink schema:about ?item;
    schema:isPartOf <https://en.wikipedia.org/>;
    schema:name ?wikipedia. }
    `,
      groupBy: "?item ?itemLabel ?wikipedia",
      orderBy,
    });
  }

  // console.log(data);

  //add id for react-admin
  data = data.map((row) => {
    row.id = row.item.value;
    if (row.P18.label) {
      // d.P18.label = getCommonsUrlByFile(d.P18.label, 400);
    }
    if (row.P569) row.P569 = row.P569.split("T")[0];
    // row.map((column) => {
    //   if (column.label) {
    //     column.label = column.label.split(SPARQL_SEPARATOR).join(", ");
    //   }
    //   return column;
    // });
    return row;
  });

  // await options?.transform?.(data);

  res.json({
    data,
    pageInfo: {
      hasPreviousPage: skip > 0,
      hasNextPage,
    },
  });
};
