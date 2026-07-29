import { useEffect, useState } from "react";

import DashboardCards from "../components/DashboardCards";
import RevenueChart from "../components/RevenueChart";
import StatusChart from "../components/StatusChart";
import TopProducts from "../components/TopProducts";
import TopColors from "../components/TopColors";
import RecentOrders from "../components/RecentOrders";
import LatestCustomers from "../components/LatestCustomers";
import TopCities from "../components/TopCities";
import InventoryCard from "../components/InventoryCard";
import QuickActions from "../components/QuickActions";

const API_URL = import.meta.env.VITE_API_URL;

const DashboardHome = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API_URL}/api/dashboard`);
      const data = await res.json();

      setDashboard(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!dashboard) {
    return (
      <div className="py-12 text-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <DashboardCards
        cards={dashboard.cards}
        averageOrderValue={dashboard.averageOrderValue}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="xl:col-span-2">
          <RevenueChart data={dashboard.revenueChart} />
        </div>

        <StatusChart statusCounts={dashboard.statusCounts} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <TopProducts products={dashboard.topProducts} />
        <TopColors colors={dashboard.topColors} />
      </div>

      <RecentOrders orders={dashboard.recentOrders} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <LatestCustomers customers={dashboard.latestCustomers} />
        <TopCities cities={dashboard.topCities} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <InventoryCard inventory={dashboard.inventory} />
        <QuickActions />
      </div>
    </div>
  );
};

export default DashboardHome;
