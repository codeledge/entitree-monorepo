//@ts-nocheck
import type { AppProps } from "next/app";
// import { ChakraProvider } from "@chakra-ui/react";
import ReactGA from "react-ga4";

ReactGA.initialize(process.env.NEXT_PUBLIC_GA_TRACKING_CODE || "placeholder", {
  testMode: !process.env.NEXT_PUBLIC_GA_TRACKING_CODE,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <ChakraProvider>
    <Component {...pageProps} />
    // </ChakraProvider>
  );
}

export default MyApp;
