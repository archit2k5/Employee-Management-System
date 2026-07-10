import "./LineChart.css";
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
  if (!active || !payload || payload.length === 0) return null;

  const isEmployeeChart = payload.some(
    (item) => item.dataKey === "headcount"
  );

  let orderedPayload = [];

  if (isEmployeeChart) {
    const order = {
      headcount: 0,
      hires: 1,
      exits: 2,
    };

    orderedPayload = [...payload].sort(
      (a, b) => order[a.dataKey] - order[b.dataKey]
    );
  } else {
    const order = {
      payroll: 0,
      benefits: 1,
    };

    orderedPayload = [...payload].sort(
      (a, b) => order[a.dataKey] - order[b.dataKey]
    );
  }

  return (
    <div className="custom-tooltip">
      <h4>{label}</h4>

      {orderedPayload.map((item) => (
        <p
          key={item.dataKey}
          style={{
            color: item.color,
            margin: "6px 0",
            fontWeight: 600,
          }}
        >
          {item.name}:{" "}
          {isEmployeeChart
            ? item.value
            : `$${item.value}M`}
        </p>
      ))}
    </div>
  );
}

export default function LineChart({ data }) {
  if (!data || data.length === 0) return null;

  // Detect which chart to draw
  const isEmployeeChart = "headcount" in data[0];

  return (
    <div className="linechart">
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={data}
          margin={{
            top: 10,
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

          {isEmployeeChart ? (
            <>
              {/* LEFT AXIS */}
              <YAxis
                yAxisId="left"
                domain={[0, 120]}
                ticks={[0, 30, 60, 90, 120]}
                stroke="#7c8db5"
                tickLine={false}
                axisLine={false}
              />

              {/* RIGHT AXIS */}
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 8]}
                ticks={[0, 2, 4, 6, 8]}
                stroke="#7c8db5"
                tickLine={false}
                axisLine={false}
              />
            </>
          ) : (
            <YAxis
              domain={[0, 12]}
              ticks={[0, 3, 6, 9, 12]}
               tickFormatter={(value) => `$${value}M`}
              stroke="#7c8db5"
               tick={{ fill: "#7c8db5", fontSize: 13 }}
              tickLine={false}
              axisLine={false}
            />
          )}

          <Tooltip
            content={<CustomTooltip />}
            
            cursor={{
              stroke: "#9fb8ff",
              strokeWidth: 2,
            }}
          />

          {/* ================= EMPLOYEE GROWTH ================= */}

          {isEmployeeChart && (
            <>
              <Bar
                yAxisId="right"
                dataKey="hires"
                name="Hires"
                fill="#4ADE80"
                radius={[4, 4, 0, 0]}
                barSize={12}
              />

              <Bar
                yAxisId="right"
                dataKey="exits"
                name="Exits"
                fill="#EF4444"
                radius={[4, 4, 0, 0]}
                barSize={12}
              />

              <Line
                yAxisId="left"
                type="monotone"
                dataKey="headcount"
                name="Headcount"
                stroke="#4F8DFF"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "#fff",
                  stroke: "#4F8DFF",
                  strokeWidth: 3,
                }}
              />
            </>
          )}

          {/* ================= PAYROLL COST ================= */}

          {!isEmployeeChart && (
            <>
              <Line
                type="monotone"
                dataKey="payroll"
                name="Payroll"
                stroke="#22D3EE"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "#fff",
                }}
              />

              <Line
                type="monotone"
                dataKey="benefits"
                name="Benefits"
                stroke="#A855F7"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "#fff",
                }}
              />
            </>
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}