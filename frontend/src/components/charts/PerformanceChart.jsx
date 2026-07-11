import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

import "./PerformanceChart.css";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="custom-tooltip">
      <h4>{payload[0].payload.label}</h4>

      <p
        style={{
          color: "#F59E0B",
          fontWeight: 600,
        }}
      >
        Employees : {payload[0].value}
      </p>
    </div>
  );
}

export default function PerformanceChart({ data }) {
  return (
    <div className="performance-chart">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid
            stroke="#24344d"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="label"
            stroke="#7c8db5"
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[0, 40]}
            ticks={[0, 10, 20, 30, 40]}
            stroke="#7c8db5"
            axisLine={false}
            tickLine={false}
          />

          <Tooltip content={<CustomTooltip />} />

          <Bar
            dataKey="rating"
            fill="#F59E0B"
            radius={[6, 6, 0, 0]}
            barSize={34}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}