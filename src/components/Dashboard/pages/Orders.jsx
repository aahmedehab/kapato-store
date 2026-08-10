// pages/Orders.jsx
import { useEffect, useState } from "react";
import { Search, Eye } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import OrderDrawer from "../components/OrderDrawer";

const API_URL = import.meta.env.VITE_API_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(`${API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `${API_URL}/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (res.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update status");
      }

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? { ...order, status: newStatus }
            : order
        )
      );

      setSelectedOrder((prev) =>
        prev?.id === orderId
          ? { ...prev, status: newStatus }
          : prev
      );
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.order_number?.toString().includes(search) ||
      order.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      order.phone?.includes(search) ||
      order.email?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalOrders = orders.length;
  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const deliveredCount = orders.filter((o) => o.status === "Delivered").length;
  const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  const formatDate = (order) => {
    const date = order.createdAt || order.created_at;
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  };

  if (loading) {
    return <div className="py-12 text-center text-gray-500">Loading orders...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold">Orders</h1>
        <p className="text-gray-500 text-sm mt-1">Manage and track your orders</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-white border rounded-xl p-4 sm:p-5">
          <p className="text-xs sm:text-sm text-gray-500">Total Orders</p>
          <p className="text-xl sm:text-2xl font-bold mt-1">{totalOrders}</p>
        </div>
        <div className="bg-white border rounded-xl p-4 sm:p-5">
          <p className="text-xs sm:text-sm text-gray-500">Revenue</p>
          <p className="text-xl sm:text-2xl font-bold mt-1 truncate">
            LE {revenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-white border rounded-xl p-4 sm:p-5">
          <p className="text-xs sm:text-sm text-gray-500">Pending</p>
          <p className="text-xl sm:text-2xl font-bold mt-1 text-yellow-600">
            {pendingCount}
          </p>
        </div>
        <div className="bg-white border rounded-xl p-4 sm:p-5">
          <p className="text-xs sm:text-sm text-gray-500">Delivered</p>
          <p className="text-xl sm:text-2xl font-bold mt-1 text-green-600">
            {deliveredCount}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-xl px-4 py-2.5 text-sm w-full sm:w-auto sm:min-w-[160px]"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Preparing">Preparing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-white border rounded-xl text-center py-12 text-gray-500">
          No orders found
        </div>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white border rounded-xl p-4"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="min-w-0">
                    <p className="font-semibold">#{order.order_number}</p>
                    <p className="font-medium text-sm mt-0.5">
                      {order.customer_name}
                    </p>
                    <p className="text-xs text-gray-500">{order.phone}</p>
                  </div>
                  <StatusBadge status={order.status || "Pending"} />
                </div>

                <div className="flex items-center justify-between text-sm border-t pt-3">
                  <div>
                    <p className="font-semibold">LE {order.total}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {formatDate(order)}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsDrawerOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-medium bg-black text-white px-3 py-2 rounded-lg"
                  >
                    <Eye size={16} />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block bg-white border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[720px]">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 lg:px-6 py-3 font-medium text-gray-500">
                      Order
                    </th>
                    <th className="text-left px-4 lg:px-6 py-3 font-medium text-gray-500">
                      Customer
                    </th>
                    <th className="text-left px-4 lg:px-6 py-3 font-medium text-gray-500">
                      Total
                    </th>
                    <th className="text-left px-4 lg:px-6 py-3 font-medium text-gray-500">
                      Status
                    </th>
                    <th className="text-left px-4 lg:px-6 py-3 font-medium text-gray-500">
                      Date
                    </th>
                    <th className="text-right px-4 lg:px-6 py-3 font-medium text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b last:border-0 hover:bg-gray-50"
                    >
                      <td className="px-4 lg:px-6 py-4 font-medium">
                        #{order.order_number}
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <div>
                          <p className="font-medium">{order.customer_name}</p>
                          <p className="text-xs text-gray-500">{order.phone}</p>
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4">LE {order.total}</td>
                      <td className="px-4 lg:px-6 py-4">
                        <StatusBadge status={order.status || "Pending"} />
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-gray-500">
                        {formatDate(order)}
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsDrawerOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                        >
                          <Eye size={16} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <OrderDrawer
        order={selectedOrder}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default Orders;
