import { PrismaClient } from "./generated/client";

export const prismaClient = new PrismaClient();

export { Metric, type Image, ActionStatus, Prisma } from "./generated/client";
