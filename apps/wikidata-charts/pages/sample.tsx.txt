import * as React from "react";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "" },
  { name: "Monday", uv: 265, pv: 800 },
  { name: "Tuesday", uv: 475, pv: 967 },
  { name: "Wednesday", uv: 624, pv: 1098 },
  { name: "Thursday", uv: 856, pv: 1200 },
  { name: "Friday", uv: 1024, pv: 1108 },
  { name: "Saturday", uv: 1116, pv: 1220 },
  { name: "Sunday", uv: 1208, pv: 1358 },
  { name: "" },
];

const formatter = (value: string) => `$${value}`;

class CustomizedTooltip extends React.PureComponent<any> {
  render() {
    const { label, payload, active, chartType } = this.props;

    if (!active || !label || payload.length === 0) return null;

    return (
      <div className="i-will-customize-tooltip-later">
        <p className="label">{`${label} : ${payload[chartType].value}`}</p>
      </div>
    );
  }
}

class CustomizedDot extends React.PureComponent<any> {
  render() {
    const { cx, cy, value } = this.props;

    if (!value) {
      return null;
    }

    return (
      <svg
        x={cx - 5}
        y={cy - 5}
        width={10}
        height={10}
        viewBox="0 0 10 10"
        fill="#ff7385"
      >
        <rect width="10" height="10" />
      </svg>
    );
  }
}

class LineBarAreaComposedChart extends React.PureComponent<any, any> {
  constructor() {
    super({});
    this.state = {
      chartType: 0,
    };
  }
  render() {
    return (
      <ResponsiveContainer minHeight={500}>
        <ComposedChart
          width={800}
          height={400}
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid stroke="#efefef" vertical={false} />
          <XAxis
            dataKey="name"
            type="category"
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            dataKey="pv"
            tickFormatter={formatter}
            type="number"
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={false}
            content={<CustomizedTooltip chartType={this.state.chartType} />}
          />
          <Legend />
          <Bar name="Donation total" dataKey="pv" barSize={80} fill="#48bbee" />
          <Line
            name="Average dontaion trend"
            type="monotone"
            dataKey="uv"
            data={data}
            stroke="#ff7385"
            dot={<CustomizedDot />}
            activeDot={{
              onMouseOver: (e: any) => this.setState({ chartType: 1 }),
              onMouseLeave: (e: any) => this.setState({ chartType: 0 }),
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}
export default LineBarAreaComposedChart;
