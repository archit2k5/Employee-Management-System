import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

import "./LeaveChart.css";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  return (
    <div className="custom-tooltip">
      <h4>{data.label}</h4>

      <p style={{ color: "#3B82F6", fontWeight: 600 }}>
        Annual : {data.annual}
      </p>

      <p style={{ color: "#EF4444", fontWeight: 600 }}>
        Sick : {data.sick}
      </p>

      <p style={{ color: "#A78BFA", fontWeight: 600 }}>
        Personal : {data.personal}
      </p>
    </div>
  );
}

export default function LeaveChart({ data }) {
  return (
    <div className="leave-chart">

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{
            top: 20,
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
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[0, 120]}
            ticks={[0, 30, 60, 90, 120]}
            stroke="#7c8db5"
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{
              fill: "rgba(255,255,255,0.05)",
            }}
            content={<CustomTooltip />}
          />

          <Bar
            dataKey="leave"
            fill="#A78BFA"
            radius={[6, 6, 0, 0]}
            barSize={30}
          />

        </BarChart>
      </ResponsiveContainer>

      <div className="leave-legend">

        <div className="leave-legend-item">
          <span
            className="leave-legend-color"
            style={{ background: "#3B82F6" }}
          ></span>
          <span>Annual</span>
        </div>

        <div className="leave-legend-item">
          <span
            className="leave-legend-color"
            style={{ background: "#EF4444" }}
          ></span>
          <span>Sick</span>
        </div>

        <div className="leave-legend-item">
          <span
            className="leave-legend-color"
            style={{ background: "#A78BFA" }}
          ></span>
          <span>Personal</span>
        </div>

      </div>

    </div>
  );
}