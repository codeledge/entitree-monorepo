import type { NextApiResponse } from "next";

export const adminApiRes = async (
  res: NextApiResponse,
  total: number,
  items: any[]
) => {
  res.setHeader("Content-Range", total);
  res.setHeader("Access-Control-Expose-Headers", "Content-Range");
  res.status(200).json(items);
};
