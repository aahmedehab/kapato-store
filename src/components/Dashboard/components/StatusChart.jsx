import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#000000",
  "#4F46E5",
  "#F59E0B",
  "#22C55E",
  "#10B981",
  "#EF4444",
];

const StatusChart = ({ statusCounts }) => {
  const data = Object.entries(statusCounts).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <div className="bg-white border rounded-xl sm:rounded-2xl p-4 sm:p-6 h-[280px] sm:h-[350px] lg:h-[420px]">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold">Order Status</h2>
        <p className="text-xs sm:text-sm text-gray-500">Orders distribution</p>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius="70%"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusChart;