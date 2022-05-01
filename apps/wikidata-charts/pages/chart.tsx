// import { Box, Heading } from "@chakra-ui/react";

import Head from "next/head";
import MainChart from "../components/MainChart";
import type { NextPage } from "next";

const Chart: NextPage = () => {
  return (
    // <Box height="100vh">
    //marginLeft={"1em"} marginTop={"0.5em"}
    <div>
      <h2 style={{ marginLeft: "1em" }}>Wikidata Charts</h2>
      <MainChart />
    </div>
    // </Box>
  );
};
export default Chart;
{
  /* <Head>
      <title>Wikidata Charts</title>
    </Head> */
}
