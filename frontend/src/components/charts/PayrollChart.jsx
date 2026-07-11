import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background: "#1b2435",
        border: "1px solid #2d3b56",
        borderRadius: 10,
        padding: "12px 16px",
        color: "#fff",
        boxShadow: "0 8px 20px rgba(0,0,0,.4)",
      }}
    >
      <h4 style={{ marginBottom: 10 }}>{label}</h4>

      {payload.map((item) => (
        <p
          key={item.dataKey}
          style={{
            color: item.color,
            margin: "6px 0",
            fontWeight: 600,
          }}
        >
          {item.name}: ${item.value}M
        </p>
      ))}
    </div>
  );
}

export default function PayrollChart({ data }) {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <ComposedChart data={data}>
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
            domain={[0, 12]}
            ticks={[0, 3, 6, 9, 12]}
            tickFormatter={(v) => `$${v}M`}
            stroke="#7c8db5"
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            cursor={{
              stroke: "#8ba5ff",
              strokeWidth: 2,
            }}
            content={<CustomTooltip />}
          />

          <Bar
            dataKey="payroll"
            fill="#5B8FF9"
            radius={[5, 5, 0, 0]}
            barSize={20}
            name="Total Payroll"
          />

          <Line
            type="monotone"
            dataKey="overhead"
            stroke="#ff8b2b"
            strokeWidth={3}
            dot={{
              r: 4,
              fill: "#ff8b2b",
            }}
            activeDot={{
              r: 6,
              fill: "#fff",
              stroke: "#ff8b2b",
              strokeWidth: 3,
            }}
            name="Overhead"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}