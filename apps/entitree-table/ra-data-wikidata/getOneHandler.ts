import { getWikidataEntities, getWikidataSparql } from "@entitree/helper";
import { GetOneRequest, Response } from "./Http";

export const getOneHandler = async <
  W extends {
    include?: object | null;
    select?: object | null;
  }
>(
  req: GetOneRequest,
  res: Response,
  options?: {
    select?: W["select"];
    include?: W["include"];
    debug?: boolean;
    transform?: (row: any) => any;
  }
) => {
  // const row = await getWikidataEntities([req.body.params.id]);
  const query = `SELECT (?item as ?id) ?itemLabel 
WHERE 
{
  BIND (wd:${req.body.params.id} AS ?item)
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}
`;
  console.log(query);
  const rows = await getWikidataSparql(query);
  const row = rows[0];

  await options?.transform?.(row);

  return res.json({ data: row });
};
