import { createRouter } from "./createRouter";
import { applePodcastRouter } from "./services/applePodcastRouter";
import { documentRouter } from "./services/documentRouter";
import { wikidataRouter } from "./services/wikidataRouter";

export const appRouter = createRouter()
  .merge(wikidataRouter)
  .merge(documentRouter)
  .merge(applePodcastRouter);

export type AppRouter = typeof appRouter;
