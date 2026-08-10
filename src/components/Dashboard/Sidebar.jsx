import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Settings,
  Palette,
  X,
  LogOut,
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
    title: "Colors",
    icon: Palette,
    path: "/dashboard/colors",
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

const Sidebar = ({ isOpen, onClose }) => {
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white shadow-lg border-r flex flex-col transition-transform duration-300 ease-in-out lg:relative lg:sticky lg:top-0 lg:translate-x-0 lg:shrink-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 lg:p-8 border-b flex items-start justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">KAPATO</h1>
            <p className="text-sm text-gray-500">Admin Panel</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/dashboard"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm sm:text-base ${
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

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm sm:text-base text-red-600 hover:bg-red-50 transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;