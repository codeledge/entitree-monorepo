import type { NextApiRequest, NextApiResponse } from "next";

import { updateSparqlItems } from "../../src/sparql/properties/run";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.status(200).json({ name: "Done" });
  await updateSparqlItems();
  res.status(200).json({ name: "Done" });
}
