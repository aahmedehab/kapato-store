import { User } from "lucide-react";

const LatestCustomers = ({ customers }) => {
  return (
    <div className="bg-white border rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">Latest Customers</h2>
          <p className="text-xs sm:text-sm text-gray-500">Recently placed orders</p>
        </div>

        <User className="text-gray-400 shrink-0" size={22} />
      </div>

      {customers.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          No customers yet
        </div>
      ) : (
        <div className="space-y-4">
          {customers.map((customer, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b last:border-0 pb-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black text-white flex items-center justify-center font-semibold shrink-0 text-sm">
                  {customer.customer_name?.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <h3 className="font-medium truncate">
                    {customer.customer_name}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    {customer.email}
                  </p>
                </div>
              </div>

              <div className="sm:text-right sm:shrink-0 ml-[52px] sm:ml-0">
                <p className="font-semibold">
                  LE {Number(customer.total).toLocaleString()}
                </p>

                <p className="text-xs text-gray-500">
                  {new Date(customer.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestCustomers;