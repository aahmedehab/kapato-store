import { User } from "lucide-react";

const LatestCustomers = ({ customers }) => {
  return (
    <div className="bg-white border rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">
            Latest Customers
          </h2>

          <p className="text-sm text-gray-500">
            Recently placed orders
          </p>
        </div>

        <User className="text-gray-400" size={24} />
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
              className="flex items-center justify-between border-b last:border-0 pb-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                  {customer.customer_name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3 className="font-medium">
                    {customer.customer_name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {customer.email}
                  </p>
                </div>
              </div>

              <div className="text-right">
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