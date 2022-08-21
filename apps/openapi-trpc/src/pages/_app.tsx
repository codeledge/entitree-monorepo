import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "../server/router";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withTRPC<AppRouter>({
  config() {
    return {
      url: `/api/trpc`,
    };
  },
  ssr: false,
})(MyApp);
