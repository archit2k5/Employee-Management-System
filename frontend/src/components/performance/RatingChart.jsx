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
  {
    department: "Engineering",
    rating: 4.2,
    color: "#4F8EF7",
  },
  {
    department: "Design",
    rating: 4.5,
    color: "#5B8FF9",
  },
  {
    department: "Marketing",
    rating: 3.9,
    color: "#4F8EF7",
  },
  {
    department: "Sales",
    rating: 4.0,
    color: "#5B8FF9",
  },
  {
    department: "HR",
    rating: 4.3,
    color: "#4F8EF7",
  },
  {
    department: "Finance",
    rating: 4.1,
    color: "#5B8FF9",
  },
];

const RatingChart = () => {
  return (
    <div className="chart-card">

      <h3>Department Average Ratings</h3>

      <ResponsiveContainer width="100%" height={330}>

        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 10,
          }}
        >

          <CartesianGrid
            stroke="#26344d"
            strokeDasharray="4 4"
            vertical={true}
          />

          <XAxis
            dataKey="department"
            tick={{
              fill: "#8ea2c6",
              fontSize: 13,
            }}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            domain={[3, 5]}
            ticks={[3, 3.5, 4, 4.5, 5]}
            tick={{
              fill: "#8ea2c6",
              fontSize: 13,
            }}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
  contentStyle={{
    backgroundColor: "#24324a",
    border: "1px solid #3b82f6",
    borderRadius: "12px",
    color: "#fff",
  }}
  labelStyle={{
    color: "#8ec5ff",
    fontWeight: 600,
  }}
  itemStyle={{
    color: "#fff",
  }}
/>

          <Bar
            dataKey="rating"
            radius={[6, 6, 0, 0]}
            barSize={30}
          >
            {data.map((item, index) => (
              <Cell
                key={index}
                fill={item.color}
              />
            ))}
          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default RatingChart;