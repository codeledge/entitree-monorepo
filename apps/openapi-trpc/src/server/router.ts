import { applePodcastRouter } from "./services/applePodcastRouter";
import { documentRouter } from "./services/documentRouter";
import { googleMapsRouter } from "./services/googleMapsRouter";
import { spotifyPodcastRouter } from "./services/spotifyPodcastRouter";
import { wikidataRouter } from "./services/wikidataRouter";
import { t } from "./trpc";

export const appRouter = t.router({
  wikidata: wikidataRouter,
  document: documentRouter,
  apple: applePodcastRouter,
  spotify: spotifyPodcastRouter,
  googleMaps: googleMapsRouter,
});

export type AppRouter = typeof appRouter;
