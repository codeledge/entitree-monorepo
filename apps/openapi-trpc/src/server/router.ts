import { createRouter } from "./createRouter";
import { applePodcastRouter } from "./services/applePodcastRouter";
import { documentRouter } from "./services/documentRouter";
import { googleMapsRouter } from "./services/googleMapsRouter";
import { spotifyPodcastRouter } from "./services/spotifyPodcastRouter";
import { wikidataRouter } from "./services/wikidataRouter";
import { t } from "./trpc";

// export const appRouter = createRouter()
//   .merge(wikidataRouter)
//   .merge(documentRouter)
//   .merge("apple.", applePodcastRouter)
//   .merge(spotifyPodcastRouter)
//   .merge(googleMapsRouter);

// export type AppRouter = typeof appRouter;

export const appRouter = t.router({
  wikidata: wikidataRouter,
  document: documentRouter,
});

export type AppRouter = typeof appRouter;
