import { createRouter } from "./createRouter";
import { twitterRouter } from "./twitterRouter";

export const appRouter = createRouter().merge(twitterRouter);

export type AppRouter = typeof appRouter;
