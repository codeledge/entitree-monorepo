import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { OpenApiMeta } from "trpc-openapi";

export const t = initTRPC.meta<OpenApiMeta>().create({
  transformer: superjson,
  errorFormatter: ({ shape, error }) => {
    return error;
  },
});
