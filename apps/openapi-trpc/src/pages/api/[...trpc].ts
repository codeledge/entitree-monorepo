import { createOpenApiNextHandler } from "trpc-openapi";
import { createContext } from "../../server/createRouter";
import { appRouter } from "../../server/router";

// Handle incoming OpenAPI requests
export default createOpenApiNextHandler({
  router: appRouter,
  createContext,
}) as any;
