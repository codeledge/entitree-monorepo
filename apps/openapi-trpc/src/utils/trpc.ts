import { createTRPCNext } from "@trpc/next";
import { httpBatchLink } from "@trpc/client";
import { AppRouter } from "../server/router";

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: "/api/trpc",
        }),
      ],
    };
  },
});
