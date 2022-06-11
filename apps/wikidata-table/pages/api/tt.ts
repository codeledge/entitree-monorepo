import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let query = `  SELECT ?item
  WHERE
  {
    ?item wdt:P31 wd:Q27686.
    
    
  }  
  
  
  LIMIT 10

  OFFSET 20

`;
  let r = await axios
    .post(
      `https://query.wikidata.org/sparql`,
      "query=" + encodeURIComponent(query)
    )
    .catch((error) => {
      console.log(error);
    });
  console.log(r);
  res.json(r.data);
}
