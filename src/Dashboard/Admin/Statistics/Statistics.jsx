import { PieChart, Pie, Cell, Legend } from "recharts";

import { useQuery } from "@tanstack/react-query";

const COLORS = ["#ffa600", "#003f5c", "#bc5090"];
import useAxiosPublic from "../../../hooks/usePublic";

const Statistics = () => {
  const axiosSecure = useAxiosPublic();
  const { data: stats = [] } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const chartData = [
    { name: "Users", value: stats[0]?.users || 0 },
    { name: "Products", value: stats[1]?.products || 0 },
    { name: "Reviews", value: stats[2]?.reviews || 0 },
  ];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="my-16">
      {/* <SectionTitle title="Statistics Page" /> */}
      <div className="stats border border-lime-500  ">
        <div className="stat text-center">
          <div className="stat-figure text-secondary"></div>
          <div className="stat-title ">Total Products</div>
          <div className="stat-value text-[#003f5c]">{stats[1]?.products}</div>
        </div>

        <div className="stat text-center">
          <div className="stat-figure text-secondary"></div>
          <div className="stat-title ">Total Users</div>
          <div className="stat-value text-[#ffa600]">{stats[0]?.users}</div>
        </div>

        <div className="stat text-center">
          <div className="stat-figure text-secondary"></div>
          <div className="stat-title">Total Reviews</div>
          <div className="stat-value text-[#bc5090] ">{stats[2]?.reviews}</div>
        </div>
      </div>
      {/* pie chart */}
      <div className="flex ">
        <PieChart width={400} height={400}>
          <Legend />
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
};

export default Statistics;
