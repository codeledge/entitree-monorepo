import { artistRouter } from "./artist";
import { chordRouter } from "./chord";
import { t } from "./trpc";

export const appRouter = t.router({
  chord: chordRouter,
  artist: artistRouter,
});

export type AppRouter = typeof appRouter;
