import { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../../prisma/prismaClient";

const hander = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username } = req.query;
  const image = await prismaClient.twitterImage.findFirst({
    where: {
      account: {
        username: username as string,
      },
    },
  });
  if (!image) {
    res.status(404).send("Not found");
  }

  res.status(200).json(image.source);
};

export default hander;
