import { PrismaClient } from "./generated/client";

export const prismaClient = new PrismaClient();

export type { TwitterAccount } from "./generated/client";
