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
    <div className="bg-white border rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.link}
              className="border rounded-xl p-5 hover:bg-black hover:text-white transition-all duration-300 flex flex-col items-center gap-3"
            >
              <Icon size={26} />

              <span className="text-sm font-medium text-center">
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