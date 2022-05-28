import { defaultHandler } from "ra-data-simple-prisma";
import { prismaClient } from "../../prisma/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  defaultHandler(req, res, prismaClient);
}
