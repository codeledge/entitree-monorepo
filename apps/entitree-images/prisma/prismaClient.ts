import { PrismaClient } from "./generated/client";

export const prismaClient = new PrismaClient();

export { Metric } from "./generated/client";
