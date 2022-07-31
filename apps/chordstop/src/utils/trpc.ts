import { setupTRPC } from "@trpc/next";
import superjson from "superjson";
import { AppRouter } from "../server/appRouter";

export const trpc = setupTRPC<AppRouter>({
  config() {
    return {
      transformer: superjson,
      url: "/api/trpc",
    };
  },
});
