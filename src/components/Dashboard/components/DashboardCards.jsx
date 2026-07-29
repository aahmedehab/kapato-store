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
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-white rounded-xl sm:rounded-2xl border p-4 sm:p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  {item.title}
                </p>

                <h2 className="mt-1 sm:mt-2 text-lg sm:text-2xl lg:text-3xl font-bold truncate">
                  {item.value}
                </h2>
              </div>

              <div
                className={`w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 ${item.color}`}
              >
                <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardCards;