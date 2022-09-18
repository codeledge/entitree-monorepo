import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";
import { AppRouter } from "../server/appRouter";
import { httpBatchLink } from "@trpc/client";

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        httpBatchLink({
          url: "/api/trpc",
        }),
      ],
      queryClientConfig: {
        defaultOptions: { queries: { staleTime: 60 * 60 * 1000 } },
      },
    };
  },
});
