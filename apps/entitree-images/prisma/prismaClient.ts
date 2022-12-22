import { createFilePath, ImageType } from "../lib/googleStorage";
import { PrismaClient } from "./generated/client";

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

export { Metric, type Image, ActionStatus, Prisma } from "./generated/client";
