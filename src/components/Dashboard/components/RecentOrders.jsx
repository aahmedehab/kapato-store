const statusClasses = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Preparing: "bg-orange-100 text-orange-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const RecentOrders = ({ orders }) => {
  return (
    <div className="bg-white border rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold">Recent Orders</h2>
        <p className="text-xs sm:text-sm text-gray-500">Latest customer orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-10 text-gray-400">No orders found</div>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-xl p-4 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold">#{order.order_number}</p>
                    <p className="text-sm font-medium mt-0.5">
                      {order.customer_name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {order.email}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${
                      statusClasses[order.status] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-sm pt-2 border-t">
                  <span className="text-gray-500">{order.city}</span>
                  <span className="font-semibold">
                    LE {Number(order.total).toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500 w-full">
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left px-4 py-3">Order</th>
                  <th className="text-left px-4 py-3">Customer</th>
                  <th className="text-left px-4 py-3">City</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Total</th>
                  <th className="text-left px-4 py-3">Date</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-4 font-semibold">
                      #{order.order_number}
                    </td>

                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium">{order.customer_name}</p>
                        <p className="text-xs text-gray-500">{order.email}</p>
                      </div>
                    </td>

                    <td className="px-4 py-4">{order.city}</td>

                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          statusClasses[order.status] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-4 py-4 font-semibold">
                      LE {Number(order.total).toLocaleString()}
                    </td>

                    <td className="px-4 py-4 text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default RecentOrders;
