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
    <div className="bg-white border rounded-xl sm:rounded-2xl p-4 sm:p-6 h-[280px] sm:h-[350px] lg:h-[420px]">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold">Revenue</h2>
        <p className="text-xs sm:text-sm text-gray-500">Monthly revenue</p>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="4 4" />

          <XAxis dataKey="month" tick={{ fontSize: 11 }} />

          <YAxis tick={{ fontSize: 11 }} width={40} />

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