import type { NextApiRequest, NextApiResponse } from "next";

import { UserModel } from "./../../models/User";
import { adminApiRes } from "../../middleware/adminApiRes";
import { adminGetMongoQuery } from "../../middleware/adminGetMongoQuery";
import connectDB from "../../middleware/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { total, items } = await adminGetMongoQuery(req, UserModel);
  adminApiRes(res, total, items);
}
