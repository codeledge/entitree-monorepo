import type { NextApiRequest, NextApiResponse } from "next";
import { WikidataPageArray } from "../../lib/data/page";
import { getListHandler, getOneHandler } from "../../ra-data-wikidata";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  type Table = {
    id: string;
    name: string;
    additional?: string[];
    sparql?: string;
  };
  // const tables: Table[] = [
  //   {
  //     id: "Q46970",
  //     name: "airlines",
  //   },
  //   {
  //     id: "Q1248784",
  //     name: "airports",
  //   },
  //   {
  //     id: "Q3918",
  //     name: "universities",
  //     additional: [WD_COUNTRY, WD_INCEPTION],
  //   },
  //   {
  //     id: "Q6256",
  //     name: "countries",
  //   },
  //   {
  //     id: WDQ_PODCAST_EPISODE,
  //     name: "JoeRogan",
  //     additional: [WD_PUBLICATION_DATE],
  //     sparql: `?item wdt:P179 wd:Q30323986. `,
  //   },
  // ];
  const table = WikidataPageArray.filter((t) => t.id == req.body.resource)[0];

  console.log(req.body.method);
  switch (req.body.method) {
    case "getList": {
      getListHandler(req, res, table);
      break;
    }
    case "getOne": {
      getOneHandler(req, res, table);
      break;
    }
  }
}
