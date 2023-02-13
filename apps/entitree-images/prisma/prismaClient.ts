import { createFilePath, ImageType } from "../lib/googleStorage";
import { GoogleImageResponse } from "../types/Image";
import { PrismaClient, Image as PrismaImage } from "./generated/client";

export const prismaClient = new PrismaClient().$extends({
  result: {
    image: {
      url: {
        needs: { id: true },
        compute: ({ id }) => {
          const images = {};
          for (let i in ImageType) {
            images[ImageType[i]] = createFilePath(ImageType[i], id, true);
          }
          return images;
        },
      },
    },
  },
});

export { Metric, ActionStatus, Prisma } from "./generated/client";

export type Image = PrismaImage & {
  faceDetectionGoogleVision: GoogleImageResponse;
};
