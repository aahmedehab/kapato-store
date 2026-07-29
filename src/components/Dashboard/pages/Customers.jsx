import { useEffect, useState } from "react";
import { Search, Eye } from "lucide-react";

import CustomerDrawer from "../components/CustomerDrawer";

const API_URL = import.meta.env.VITE_API_URL;

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchCustomers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/customers`);
      const data = await res.json();

      setCustomers(data);
      setFilteredCustomers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openCustomer = async (email) => {
    try {
      const encodedEmail = encodeURIComponent(email);

      const res = await fetch(
        `${API_URL}/api/customers/${encodedEmail}`
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      setSelectedCustomer(data);
      setDrawerOpen(true);
    } catch (err) {
      console.error(err);
      alert("Failed to load customer.");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    const value = search.toLowerCase();

    setFilteredCustomers(
      customers.filter(
        (customer) =>
          customer.customer_name?.toLowerCase().includes(value) ||
          customer.email?.toLowerCase().includes(value)
      )
    );
  }, [search, customers]);

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-500">
        Loading customers...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold">Customers</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your customers</p>
      </div>

      <div className="mb-6">
        <div className="relative w-full sm:max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-black outline-none text-sm"
          />
        </div>
      </div>

      {filteredCustomers.length === 0 ? (
        <div className="bg-white border rounded-xl text-center py-12 text-gray-500">
          No customers found
        </div>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.email}
                className="bg-white border rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center font-semibold shrink-0">
                    {customer.customer_name?.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {customer.customer_name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {customer.email}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {customer.phone}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t text-center text-xs sm:text-sm">
                  <div>
                    <p className="text-gray-500">Orders</p>
                    <p className="font-semibold">{customer.orders_count}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Spent</p>
                    <p className="font-semibold">
                      LE {Number(customer.total_spent).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Last</p>
                    <p className="font-semibold">
                      {new Date(customer.last_order).toLocaleDateString(
                        undefined,
                        { month: "short", day: "numeric" }
                      )}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => openCustomer(customer.email)}
                  className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50"
                >
                  <Eye size={16} />
                  View Details
                </button>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-xl border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[720px]">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 lg:px-6 py-3">Customer</th>
                    <th className="text-left px-4 lg:px-6 py-3">Phone</th>
                    <th className="text-left px-4 lg:px-6 py-3">Orders</th>
                    <th className="text-left px-4 lg:px-6 py-3">Total Spent</th>
                    <th className="text-left px-4 lg:px-6 py-3">Last Order</th>
                    <th className="text-right px-4 lg:px-6 py-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer.email}
                      className="border-b hover:bg-gray-50 last:border-0"
                    >
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold shrink-0">
                            {customer.customer_name?.charAt(0)}
                          </div>

                          <div className="min-w-0">
                            <p className="font-medium truncate">
                              {customer.customer_name}
                            </p>
                            <p className="text-gray-500 text-xs truncate">
                              {customer.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 lg:px-6 py-4">{customer.phone}</td>

                      <td className="px-4 lg:px-6 py-4">
                        {customer.orders_count}
                      </td>

                      <td className="px-4 lg:px-6 py-4 font-medium">
                        LE {Number(customer.total_spent).toLocaleString()}
                      </td>

                      <td className="px-4 lg:px-6 py-4">
                        {new Date(customer.last_order).toLocaleDateString()}
                      </td>

                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex justify-end">
                          <button
                            onClick={() => openCustomer(customer.email)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition"
                          >
                            <Eye size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <CustomerDrawer
        open={drawerOpen}
        data={selectedCustomer}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
};

export default Customers;
