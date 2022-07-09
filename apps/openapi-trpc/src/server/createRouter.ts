import * as trpc from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { OpenApiMeta } from "trpc-openapi";
import { v4 as uuid } from "uuid";

export type Context = {
  requestId: string;
};

export const createContext = async ({
  req,
  res,
}: CreateNextContextOptions): Promise<Context> => {
  const requestId = uuid();
  res.setHeader("x-request-id", requestId);

  return { requestId };
};

export const createRouter = () => {
  return trpc.router<Context, OpenApiMeta>();
};
