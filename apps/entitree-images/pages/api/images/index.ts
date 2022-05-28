import ImageModel, { Image, UploadImage } from "../../../models/Image";
import type { NextApiRequest, NextApiResponse } from "next";
import { getNumericId, isEntityId } from "wikibase-sdk";

import { UserModel } from "../../../models/User";
import { adminApiRes } from "../../../middleware/adminApiRes";
import { adminGetMongoQuery } from "../../../middleware/adminGetMongoQuery";
import axios from "axios";
import connectDB from "../../../middleware/mongodb";
import { getSession } from "next-auth/react";
import { uploadAndGetPublicFile } from "../../../lib/googleStorage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const session = await getSession({ req });
  const userId = session?.userId;
  const role = session?.role;

  // console.log(req.query);
  // console.log(req.body);

  switch (req.method) {
    case "GET": {
      const { filter } = req.query;

      const { wikidataLabel, createdBy } = JSON.parse(filter as string);

      const baseFlter: Record<any, any> = {};
      if (wikidataLabel) {
        const regex = new RegExp(wikidataLabel, "i");
        baseFlter.wikidataLabel = regex;
      }
      if (createdBy) {
        const regex = new RegExp(createdBy, "i");

        const users = await UserModel.find({ email: regex }, "_id");

        const userIds = users.map(({ id }) => id);

        baseFlter.createdBy = { $in: userIds };
      }
      const { total, items } = await adminGetMongoQuery<Image>(
        req,
        ImageModel,
        baseFlter
      );
      adminApiRes(res, total, items);
      break;
    }
    case "POST":
      if (role === "blocked") {
        return res
          .status(401)
          .json({ message: "You are not allowed to perform this action" });
      }

      let {
        name,
        image,
        recordedDate,
        sourceUrl,
        downloadUrl,
        wikidataLabel,
        wikidataEntity,
      }: Pick<
        Image,
        | "wikidataEntity"
        | "wikidataLabel"
        | "recordedDate"
        | "downloadUrl"
        | "sourceUrl"
        | "name"
      > & {
        image: UploadImage;
      } = req.body;

      if (!image && !downloadUrl) {
        res.status(409).json({
          error: true,
          message: "Please upload a file or enter a download URL",
        });
        break;
      }

      if (image && downloadUrl) {
        res.status(400).json({
          message: "Cannot select both (either image or download Url)",
        });
        break;
      }
      if (!isEntityId(wikidataEntity)) {
        res.status(400).json({ message: "not valid Wikidata ID" });
        break;
      }

      // var re = new RegExp("^data:" + image.type + ";base64,", "");
      // var base64Data = image.base64.replace(re, "");
      if (downloadUrl) {
        console.log("downloading file", downloadUrl);
        const download = await axios.get(downloadUrl, {
          responseType: "arraybuffer",
        });
        image = {
          title: downloadUrl.split("/").pop() || "undefined",
          size: 0,
          base64: Buffer.from(download.data, "binary").toString("base64"),
          type: "image",
        };
      }

      const imageDoc = await ImageModel.create({
        name,
        wikidataEntity: getNumericId(wikidataEntity),
        wikidataLabel,
        sourceUrl,
        recordedDate,
        originalFilename: image.title,
        uploadSite: "localhost", //REPLACE with hostname
        viewCount: 1,
        fileSize: image.size,
        createdBy: userId,
        priority: 0, //0-9, 9 is the highest
        faceDetectionGoogleVision: {},
        // faceDetectedGoogleVision: false,
        statusBackgroundRemoval: "PotentialActionStatus",
        statusGoogleFaceDetection: "PotentialActionStatus",
        statusImageCropping: "PotentialActionStatus",
      });

      const originalFile = `uploads/original/${imageDoc.id}`;

      const publicFile = await uploadAndGetPublicFile(
        originalFile,
        image.base64
      );
      console.log(publicFile);

      res.json(imageDoc);
      break;

    default:
      res.status(409).json({});
      break;
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};
