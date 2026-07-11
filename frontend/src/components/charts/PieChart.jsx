import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div
      style={{
        background: "#1E293B",
        border: "1px solid #334155",
        borderRadius: "12px",
        padding: "12px 16px",
        color: "#fff",
        boxShadow: "0 8px 20px rgba(0,0,0,.4)",
      }}
    >
      <div
        style={{
          color: data.color,
          fontWeight: 700,
          marginBottom: 8,
        }}
      >
        {data.dept}
      </div>

      <div>Employees : {data.value}</div>
    </div>
  );
}

export default function PieChart({ data }) {
  return (
    <div style={{ width: "100%", height: 330 }}>
      <ResponsiveContainer>
        <RePieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="dept"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={({ dept, value }) => `${dept}: ${value}`}
            labelLine={false}
            activeOuterRadius={100}
          >
            {data.map((entry) => (
              <Cell
                key={entry.dept}
                fill={entry.color}
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
}