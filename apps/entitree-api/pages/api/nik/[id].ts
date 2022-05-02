import type { NextApiRequest, NextApiResponse } from "next";

import { getDataFromNIK } from "@entitree/helper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  let nik = id as string;
  let data = getDataFromNIK(nik);
  if (!data) {
    res.status(404).json({
      errorMsg: "Invalid NIK",
      error: true,
    });
  }
  res.json({
    data,
    error: false,
  });
}
