import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

import "./AttendanceChart.css";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  return (
    <div className="custom-tooltip">
      <h4>{data.label}</h4>

      <p style={{ color: "#22C55E", fontWeight: 600 }}>
        Present : {data.present}
      </p>

      <p style={{ color: "#EF4444", fontWeight: 600 }}>
        Absent : {data.absent}
      </p>

      <p style={{ color: "#F59E0B", fontWeight: 600 }}>
        Late : {data.late}
      </p>
    </div>
  );
}

export default function AttendanceChart({ data }) {
  return (
    <div className="attendance-chart">

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
            domain={[0, 24]}
            ticks={[0, 6, 12, 18, 24]}
            stroke="#7c8db5"
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
            content={<CustomTooltip />}
          />

          <Bar
            dataKey="attendance"
            fill="#F59E0B"
            radius={[6, 6, 0, 0]}
            barSize={28}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="attendance-legend">

        <div className="attendance-legend-item">
          <span
            className="attendance-legend-color"
            style={{ background: "#22C55E" }}
          ></span>
          <span>Present</span>
        </div>

        <div className="attendance-legend-item">
          <span
            className="attendance-legend-color"
            style={{ background: "#EF4444" }}
          ></span>
          <span>Absent</span>
        </div>

        <div className="attendance-legend-item">
          <span
            className="attendance-legend-color"
            style={{ background: "#F59E0B" }}
          ></span>
          <span>Late</span>
        </div>

      </div>

    </div>
  );
}