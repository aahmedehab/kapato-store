import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const RevenueChart = ({ data }) => {
  const chartData = data.map((item) => ({
    month: item.month,
    revenue: Number(item.revenue),
  }));

  return (
    <div className="bg-white border rounded-2xl p-6 h-[420px]">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Revenue
        </h2>

        <p className="text-sm text-gray-500">
          Monthly revenue
        </p>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="4 4" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#000"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;