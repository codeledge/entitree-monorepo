import {
  createHandler,
  defaultHandler,
  deleteHandler,
} from "ra-data-simple-prisma";
import { prismaClient, Prisma } from "../../../prisma/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";
import { getNumericId, isEntityId } from "wikidata-sdk";
import axios from "axios";
import { uploadAndGetPublicFile } from "../../../lib/googleStorage";
import { deleteFilesById } from "../../../lib/googleStorage";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  console.log(session);
  const userId = session?.userId as number;
  const role = session?.role;
  console.log(session);

  switch (req.body.method) {
    case "create":
      // req.body.params.data.wikidataEntity =
      //   req.body.params.data.wikidataEntity.replace(/^Q/, "");
      let data = req.body.params.data; //: Image

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

      let image = data.image;
      if (data.downloadUrl) {
        console.log("downloading file", data.downloadUrl);
        const download = await axios.get(data.downloadUrl, {
          responseType: "arraybuffer",
        });
        image = {
          title: data.downloadUrl.split("/").pop() || "undefined",
          size: 0,
          base64: Buffer.from(download.data, "binary").toString("base64"),
          type: "image",
        };
      }

      if (!userId) {
        res.status(400).json({
          message: "Error",
        });
        return;
      }

      let imageCreate: Prisma.ImageCreateInput = {
        internalFileName: "temp" + new Date().valueOf(),
        wikidataEntity: parseInt(getNumericId(data.wikidataEntity)),
        wikidataLabel: data.wikidataLabel,
        originalFilename: image.title,
        recordedDate: data.recordedDate,
        sourceUrl: data.sourceUrl,
        uploadSite: "localhost",
        fileSize: image.size,
        createdBy: {
          connect: {
            id: userId,
          },
        },
      };
      const originalFile = `uploads/original/${imageCreate.internalFileName}`;

      const publicFile = await uploadAndGetPublicFile(
        originalFile,
        image.base64
      );
      console.log(imageCreate, publicFile);
      req.body.params.data = imageCreate;
      console.log(req.body.params);
      return createHandler(req, res, prismaClient.image);
      break;
    case "delete":
      if (role !== "admin") {
        return res.status(401).json({ message: "This is admin only" });
      }

      const id = +req.query.id;

      try {
        await deleteFilesById(id);
      } catch (error) {
        console.log(error);
        // return res.status(500).json({
        //   error,
        //   message: "Image Deleted from db, but files not deleted",
        // });
      }
      return deleteHandler(req, res, prismaClient.image);

      break;
    default: // <= fall back on default handler
      return defaultHandler(req, res, prismaClient);
  }
}
