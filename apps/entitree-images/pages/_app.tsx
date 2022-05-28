import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

function ReactAdminApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
export default ReactAdminApp;
