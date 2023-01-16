import MainChart from "../components/MainChart";
import type { NextPage } from "next";

const Chart: NextPage = () => {
  return (
    <div>
      <h2 style={{ marginLeft: "1em" }}>Wikidata Charts</h2>
      <MainChart />
    </div>
  );
};
export default Chart;
