import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const links = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Orders",
    icon: ShoppingBag,
    path: "/dashboard/orders",
  },
  {
    title: "Products",
    icon: Package,
    path: "/dashboard/products",
  },
  {
    title: "Customers",
    icon: Users,
    path: "/dashboard/customers",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-lg border-r">

      <div className="p-8 border-b">
        <h1 className="text-2xl font-bold">
          KAPATO
        </h1>

        <p className="text-sm text-gray-500">
          Admin Panel
        </p>
      </div>

      <nav className="p-4 space-y-2">

        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <Icon size={20} />
              {link.title}
            </NavLink>
          );
        })}

      </nav>
    </aside>
  );
};

export default Sidebar;