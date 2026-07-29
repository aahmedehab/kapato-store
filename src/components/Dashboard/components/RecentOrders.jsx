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
    <div className="bg-white border rounded-2xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">
            Recent Orders
          </h2>

          <p className="text-sm text-gray-500">
            Latest customer orders
          </p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          No orders found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
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
                      <p className="font-medium">
                        {order.customer_name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {order.email}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    {order.city}
                  </td>

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
      )}
    </div>
  );
};

export default RecentOrders;