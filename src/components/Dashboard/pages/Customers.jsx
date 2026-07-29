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
      <div className="p-8 text-center">
        Loading customers...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-2xl font-bold">
            Customers
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage your customers
          </p>
        </div>

      </div>

      {/* Search */}

      <div className="mb-6">

        <div className="relative max-w-md">

          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-black outline-none"
          />

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl border overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 border-b">

            <tr>

              <th className="text-left px-6 py-3">
                Customer
              </th>

              <th className="text-left px-6 py-3">
                Phone
              </th>

              <th className="text-left px-6 py-3">
                Orders
              </th>

              <th className="text-left px-6 py-3">
                Total Spent
              </th>

              <th className="text-left px-6 py-3">
                Last Order
              </th>

              <th className="text-right px-6 py-3">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredCustomers.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-500"
                >
                  No customers found
                </td>

              </tr>

            ) : (

              filteredCustomers.map((customer) => (

                <tr
                  key={customer.email}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">

                        {customer.customer_name?.charAt(0)}

                      </div>

                      <div>

                        <p className="font-medium">
                          {customer.customer_name}
                        </p>

                        <p className="text-gray-500 text-xs">
                          {customer.email}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-4">
                    {customer.phone}
                  </td>

                  <td className="px-6 py-4">
                    {customer.orders_count}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    LE {Number(customer.total_spent).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(customer.last_order).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">

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

              ))

            )}

          </tbody>

        </table>
        
<CustomerDrawer
  open={drawerOpen}
  data={selectedCustomer}
  onClose={() => setDrawerOpen(false)}
/>

      </div>

    </div>
  );
};

export default Customers;