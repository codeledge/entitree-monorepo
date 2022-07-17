import { Context } from "./context";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { OpenApiMeta } from "trpc-openapi";

export const t = initTRPC<{
  ctx: Context;
  meta: OpenApiMeta;
}>()({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});
