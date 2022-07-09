import { wikidataRouter } from "./wikidataRouter";
import { createRouter } from "./createRouter";
import { documentRouter } from "./documentRouter";

export const appRouter = createRouter()
  .merge(wikidataRouter)
  .merge(documentRouter);

export type AppRouter = typeof appRouter;
