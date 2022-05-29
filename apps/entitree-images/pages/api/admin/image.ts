import { createHandler, defaultHandler } from "ra-data-simple-prisma";
import { prismaClient } from "../../../prisma/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.body.method) {
    case "create":
      return createHandler(req, res, prismaClient.image, {
        connect: {},
      });
    default: // <= fall back on default handler
      return defaultHandler(req, res, prismaClient);
  }
}
