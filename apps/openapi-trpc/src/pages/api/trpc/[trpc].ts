import { createNextApiHandler } from "@trpc/server/adapters/next";
import { createContext } from "../../../server/createRouter";
import { appRouter } from "../../../server/router";

// Handle incoming tRPC requests
export default createNextApiHandler({
  router: appRouter,
  createContext,
}) as any;
