import { createHandler, defaultHandler } from "ra-data-simple-prisma";
import { prismaClient } from "../../../prisma/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";
import { getNumericId, isEntityId } from "wikidata-sdk";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.body.method) {
    case "create":
      // req.body.params.data.wikidataEntity =
      //   req.body.params.data.wikidataEntity.replace(/^Q/, "");
      let data = req.body.params.data;
      console.log(data);
      if (!data.image && !data.downloadUrl) {
        res.status(409).json({
          error: true,
          message: "Please upload a file or enter a download URL",
        });
        break;
      }

      if (data.image && data.downloadUrl) {
        res.status(400).json({
          message: "Cannot select both (either image or download Url)",
        });
        break;
      }
      if (!isEntityId(data.wikidataEntity)) {
        res.status(400).json({ message: "not a valid Wikidata ID" });
        break;
      }

      if (data.downloadUrl) {
        console.log("downloading file", data.downloadUrl);
        const download = await axios.get(data.downloadUrl, {
          responseType: "arraybuffer",
        });
        let image = {
          title: data.downloadUrl.split("/").pop() || "undefined",
          size: 0,
          base64: Buffer.from(download.data, "binary").toString("base64"),
          type: "image",
        };
      }

      // const imageDoc = await ImageModel.create({
      //   name,
      //   wikidataEntity: getNumericId(wikidataEntity),
      //   wikidataLabel,
      //   sourceUrl,
      //   recordedDate,
      //   originalFilename: image.title,
      //   uploadSite: "localhost", //REPLACE with hostname
      //   viewCount: 1,
      //   fileSize: image.size,
      //   createdBy: userId,
      //   priority: 0, //0-9, 9 is the highest
      //   faceDetectionGoogleVision: {},
      //   // faceDetectedGoogleVision: false,
      //   statusBackgroundRemoval: "PotentialActionStatus",
      //   statusGoogleFaceDetection: "PotentialActionStatus",
      //   statusImageCropping: "PotentialActionStatus",
      // });

      // const originalFile = `uploads/original/${imageDoc.id}`;

      // const publicFile = await uploadAndGetPublicFile(
      //   originalFile,
      //   image.base64
      // );
      // console.log(publicFile);

      return createHandler(req, res, prismaClient.image, {
        connect: {},
      });
    default: // <= fall back on default handler
      return defaultHandler(req, res, prismaClient);
  }
}
