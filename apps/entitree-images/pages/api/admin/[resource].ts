import { defaultHandler } from "ra-data-simple-prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../../prisma/prismaClient";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  defaultHandler(req, res, prismaClient);
}
