import { Plus, ShoppingBag, Palette, Users } from "lucide-react";
import { Link } from "react-router-dom";

const QuickActions = () => {
  const actions = [
    {
      title: "Add Product",
      icon: Plus,
      link: "/dashboard/products",
    },
    {
      title: "Manage Orders",
      icon: ShoppingBag,
      link: "/dashboard/orders",
    },
    {
      title: "Manage Colors",
      icon: Palette,
      link: "/dashboard/colors",
    },
    {
      title: "Customers",
      icon: Users,
      link: "/dashboard/customers",
    },
  ];

  return (
    <div className="bg-white border rounded-xl sm:rounded-2xl p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.link}
              className="border rounded-xl p-4 sm:p-5 hover:bg-black hover:text-white transition-all duration-300 flex flex-col items-center gap-2 sm:gap-3"
            >
              <Icon size={22} className="sm:w-[26px] sm:h-[26px]" />

              <span className="text-xs sm:text-sm font-medium text-center leading-tight">
                {action.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;