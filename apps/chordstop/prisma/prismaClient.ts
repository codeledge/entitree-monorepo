import { PrismaClient } from "./generated/client";

export const prismaClient = new PrismaClient();

export type { Artist, Chord } from "./generated/client";
