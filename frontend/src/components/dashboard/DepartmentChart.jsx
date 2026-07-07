import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Engineering", value: 42, color: "#4F8EF7" },
  { name: "Marketing", value: 18, color: "#29C5F6" },
  { name: "Finance", value: 21, color: "#35D49A" },
  { name: "HR", value: 12, color: "#FF9839" },
  { name: "Design", value: 15, color: "#F062B0" },
];

const DepartmentChart = () => {
  return (
    <div className="chart-card">

      <div className="chart-header">
        <h3>Headcount by Department</h3>

        <button className="chart-btn">
          Monthly ▾
        </button>
      </div>

      <div className="department-wrapper">

        <div className="pie-wrapper">

          <ResponsiveContainer width="100%" height={250}>

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={2}
                stroke="#182235"
                strokeWidth={3}
              >
                {data.map((item, index) => (
                  <Cell
                    key={index}
                    fill={item.color}
                  />
                ))}
              </Pie>

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
/>

            </PieChart>

          </ResponsiveContainer>

          <div className="pie-center">
            <h2>108</h2>
            <p>Employees</p>
          </div>

        </div>

        <div className="department-legend">

          {data.map((item) => (

            <div className="legend-item" key={item.name}>

              <div className="legend-left">

                <span
                  className="legend-dot"
                  style={{
                    background:item.color
                  }}
                ></span>

                <span>{item.name}</span>

              </div>

              <strong>{item.value}%</strong>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default DepartmentChart;