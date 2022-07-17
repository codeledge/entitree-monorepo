import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { trpc } from "../src/utils/trpc";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
export default trpc.withTRPC(MyApp);
