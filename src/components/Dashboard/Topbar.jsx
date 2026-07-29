import { Bell, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/dashboard/orders": "Orders",
  "/dashboard/products": "Products",
  "/dashboard/colors": "Colors",
  "/dashboard/customers": "Customers",
  "/dashboard/settings": "Settings",
};

const Topbar = ({ onMenuClick }) => {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] || "Dashboard";

  return (
    <header className="bg-white px-4 sm:px-6 lg:px-8 py-4 sm:py-5 border-b flex justify-between items-center sticky top-0 z-30">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg hover:bg-gray-100 lg:hidden shrink-0"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold truncate">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-3 sm:gap-6 shrink-0">
        <button className="p-2 rounded-lg hover:bg-gray-100 transition">
          <Bell size={20} />
        </button>

        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">
          A
        </div>
      </div>
    </header>
  );
};

export default Topbar;
