import * as Highcharts from "highcharts";
// Module with declaration:
import AccessibilityModule from "highcharts/modules/accessibility";
// Module with any type:
// import NewModule from "highcharts/modules/new";
// Initiate the chart
(Highcharts as any).newChart("container", {
  series: [
    {
      type: "new",
      data: [1, 2, 3, 4, 5],
    },
  ],
  Highcharts,
});
