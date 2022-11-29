import { createReactQueryHooks } from "@trpc/react-query";
import { AppRouter } from "../server/router";

export const trpc = createReactQueryHooks<AppRouter>();
