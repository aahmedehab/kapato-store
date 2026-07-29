import { X, Mail, Phone, MapPin, ShoppingBag, Calendar } from "lucide-react";

const CustomerDrawer = ({ open, onClose, data }) => {
  if (!open || !data) return null;

  const { customer, orders } = data;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
      />

      <div className="fixed right-0 top-0 h-full w-[520px] bg-white shadow-2xl z-50 flex flex-col">

        {/* Header */}

        <div className="p-6 border-b flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              {customer.customer_name}
            </h2>

            <p className="text-gray-500 text-sm">
              Customer Details
            </p>

          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X />
          </button>

        </div>

        {/* Body */}

        <div className="flex-1 overflow-y-auto p-6 space-y-8">

          {/* Info */}

          <div>

            <h3 className="font-semibold mb-4">
              Information
            </h3>

            <div className="space-y-4">

              <div className="flex gap-3">

                <Mail size={18} />

                <div>

                  <p className="text-xs text-gray-500">
                    Email
                  </p>

                  <p>{customer.email}</p>

                </div>

              </div>

              <div className="flex gap-3">

                <Phone size={18} />

                <div>

                  <p className="text-xs text-gray-500">
                    Phone
                  </p>

                  <p>{customer.phone}</p>

                </div>

              </div>

              <div className="flex gap-3">

                <MapPin size={18} />

                <div>

                  <p className="text-xs text-gray-500">
                    Address
                  </p>

                  <p>
                    {customer.address}
                  </p>

                  <p className="text-sm text-gray-500">
                    {customer.city}, {customer.governorate}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Stats */}

          <div>

            <h3 className="font-semibold mb-4">
              Statistics
            </h3>

            <div className="grid grid-cols-2 gap-4">

              <div className="border rounded-xl p-4">

                <p className="text-sm text-gray-500">
                  Orders
                </p>

                <h2 className="text-2xl font-bold">
                  {customer.orders_count}
                </h2>

              </div>

              <div className="border rounded-xl p-4">

                <p className="text-sm text-gray-500">
                  Total Spent
                </p>

                <h2 className="text-2xl font-bold">
                  LE {Number(customer.total_spent).toLocaleString()}
                </h2>

              </div>

            </div>

          </div>

          {/* Orders */}

          <div>

            <h3 className="font-semibold mb-4">
              Orders
            </h3>

            <div className="space-y-4">

              {orders.map((order) => (

                <div
                  key={order.id}
                  className="border rounded-xl p-4"
                >

                  <div className="flex justify-between items-center mb-3">

                    <div>

                      <p className="font-semibold">
                        #{order.order_number}
                      </p>

                      <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">

                        <Calendar size={14} />

                        {new Date(
                          order.created_at
                        ).toLocaleDateString()}

                      </div>

                    </div>

                    <div>

                      <span
                        className="px-3 py-1 rounded-full text-xs bg-gray-100"
                      >
                        {order.status}
                      </span>

                    </div>

                  </div>

                  <div className="space-y-2">

                    {order.items.map((item) => (

                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >

                        <div className="flex gap-2">

                          <ShoppingBag size={15} />

                          <div>

                            <p>
                              {item.product_name}
                            </p>

                            <p className="text-gray-500 text-xs">

                              {item.color} × {item.quantity}

                            </p>

                          </div>

                        </div>

                        <span>

                          LE{" "}
                          {(
                            item.price *
                            item.quantity
                          ).toLocaleString()}

                        </span>

                      </div>

                    ))}

                  </div>

                  <div className="border-t mt-4 pt-3 flex justify-between font-semibold">

                    <span>Total</span>

                    <span>

                      LE{" "}
                      {Number(order.total).toLocaleString()}

                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default CustomerDrawer;