import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  TrendingUp,
} from "lucide-react";

const DashboardCards = ({ cards, averageOrderValue }) => {
  const items = [
    {
      title: "Revenue",
      value: `LE ${Number(cards.totalRevenue).toLocaleString()}`,
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Orders",
      value: cards.totalOrders,
      icon: ShoppingBag,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Customers",
      value: cards.totalCustomers,
      icon: Users,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Products",
      value: cards.totalProducts,
      icon: Package,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Average Order",
      value: `LE ${Number(averageOrderValue).toLocaleString()}`,
      icon: TrendingUp,
      color: "bg-pink-100 text-pink-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-white rounded-2xl border p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>

                <h2 className="mt-2 text-3xl font-bold">
                  {item.value}
                </h2>
              </div>

              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${item.color}`}
              >
                <Icon size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardCards;