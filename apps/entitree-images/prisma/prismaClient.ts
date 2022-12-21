import { PrismaClient } from "./generated/client";

export const prismaClient = new PrismaClient().$extends({
  result: {
    image: {
      imageUrl: {
        needs: { id: true },
        compute: ({ id }) => {
          return `https://storage.googleapis.com/entitree-images/${id}.jpg`;
        },
      },
    },
  },
});

export { Metric, type Image, ActionStatus, Prisma } from "./generated/client";
