import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
 YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

const data = [
  { department: "Eng", attendance: 96, color: "#4F8EF7" },
  { department: "Design", attendance: 98, color: "#29C5F6" },
  { department: "Mktg", attendance: 91, color: "#9D7CF9" },
  { department: "Sales", attendance: 89, color: "#35D49A" },
  { department: "HR", attendance: 99, color: "#FF9839" },
  { department: "Finance", attendance: 97, color: "#F062B0" },
];

const AttendanceChart = () => {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Attendance Overview</h3>
        <button className="chart-btn">Monthly ▾</button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: -15,
            bottom: 0,
          }}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#2D3A53"
            vertical={false}
          />

          <XAxis
            dataKey="department"
            tick={{ fill: "#94A3B8", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[80, 100]}
            tick={{ fill: "#94A3B8", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />

<Tooltip
  contentStyle={{
    backgroundColor: "#ffffff",
    border: "1px solid #3B82F6",
    borderRadius: "10px",
    color: "#111827",
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
  }}
  labelStyle={{
    color: "#111827",
    fontWeight: "600",
  }}
  itemStyle={{
    color: "#2563EB",
    fontWeight: "500",
  }}
  cursor={{
    fill: "rgba(59,130,246,0.08)",
  }}
/>
          <Bar
            dataKey="attendance"
            radius={[8, 8, 0, 0]}
            barSize={34}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.color}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;