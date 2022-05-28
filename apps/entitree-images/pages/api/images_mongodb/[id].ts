import type { NextApiRequest, NextApiResponse } from "next";

import { Image } from "../../../models/Image";
import ImageModel from "../../../models/Image";
import connectDB from "../../../middleware/mongodb";
import { deleteFilesById } from "../../../lib/googleStorage";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const session = await getSession({ req });
  const userId = session?.userId;
  const role = session?.role;

  console.log("query", req.query);
  console.log("body", req.body);

  switch (req.method) {
    //for the show action of image
    case "GET": {
      const id = req.query.id as string;
      const image = await ImageModel.findOne({
        id: +id,
      });

      res.json(image);
      break;
    }
    case "PUT": {
      const id = req.query.id as string;
      const fields = req.body as Image;

      const image = await ImageModel.findOneAndUpdate(
        {
          id: +id,
        },
        {
          ...fields,
        }
      );

      res.json(image);
      break;
    }
    case "DELETE":
      if (role !== "admin") {
        return res.status(401).json({ message: "This is admin only" });
      }

      const id = +req.query.id;

      try {
        await ImageModel.deleteOne({ id });
      } catch (error) {
        return res.status(500).json({
          error,
          message: "Image not deleted",
        });
      }

      try {
        await deleteFilesById(id);
      } catch (error) {
        // return res.status(500).json({
        //   error,
        //   message: "Image Deleted from db, but files not deleted",
        // });
      }
      res.json({ id });
      break;
    default:
      res.status(409).json({});
      break;
  }
}
