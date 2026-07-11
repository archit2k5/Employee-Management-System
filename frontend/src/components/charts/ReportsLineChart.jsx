import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      style={{
        background: "#1c2740",
        border: "1px solid #334155",
        borderRadius: "10px",
        padding: "10px 14px",
      }}
    >
      <div
        style={{
          color: "#fff",
          fontWeight: 700,
          marginBottom: 6,
        }}
      >
        {label}
      </div>

      <div
        style={{
          color: "#4F8DFF",
          fontWeight: 600,
        }}
      >
        Headcount : {payload[0].value}
      </div>
    </div>
  );
}

export default function ReportsLineChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 15,
          right: 20,
          left: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid
          stroke="#24344d"
          strokeDasharray="3 3"
        />

        <XAxis
          dataKey="label"
          stroke="#7c8db5"
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          domain={[0, 120]}
          ticks={[0, 30, 60, 90, 120]}
          stroke="#7c8db5"
          tickLine={false}
          axisLine={false}
        />

        <Tooltip
          content={<CustomTooltip />}
          cursor={{
            stroke: "#7aa2ff",
            strokeWidth: 2,
          }}
        />

        <Line
          dataKey="value"
          stroke="#4F8DFF"
          strokeWidth={3}
          dot={{
            r: 4,
            fill: "#4F8DFF",
          }}
          activeDot={{
            r: 6,
            fill: "#fff",
            stroke: "#4F8DFF",
            strokeWidth: 3,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}