import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import ReactGA from "react-ga4";

ReactGA.initialize(process.env.NEXT_PUBLIC_GA_TRACKING_CODE || "placeholder", {
  testMode: !process.env.NEXT_PUBLIC_GA_TRACKING_CODE,
});

function ReactAdminApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
export default ReactAdminApp;
