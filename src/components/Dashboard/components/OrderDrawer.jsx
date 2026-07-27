// components/OrderDrawer.jsx
import { X } from "lucide-react";
import StatusBadge from "./StatusBadge";

const OrderDrawer = ({ order, isOpen, onClose, onStatusChange }) => {
  if (!isOpen || !order) return null;

  const statuses = ["Pending", "Confirmed", "Preparing", "Shipped", "Delivered", "Cancelled"];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">Order #{order.order_number}</h2>
              <div className="mt-2">
                <StatusBadge status={order.status || "Pending"} />
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={20} />
            </button>
          </div>

          {/* Customer */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Customer</h3>
            <p className="font-medium text-lg">{order.customer_name}</p>
            <p className="text-sm text-gray-600 mt-1">{order.email}</p>
            <p className="text-sm text-gray-600">{order.phone}</p>
          </div>

          {/* Shipping Address */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Shipping Address</h3>
            <p className="text-sm leading-relaxed">
              {order.address}<br />
              {order.city}<br />
              {order.governorate}
            </p>
          </div>

          {/* Products */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Products</h3>
            <div className="space-y-4">
              {order.items?.map((item) => (
                <div key={item.id} className="flex justify-between text-sm border-b pb-3">
                  <div>
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {item.color} • SKU: {item.sku}
                    </p>
                    <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">LE {item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="mb-8 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>LE {order.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>LE {order.shipping}</span>
            </div>
            <div className="flex justify-between font-bold text-base pt-2 border-t">
              <span>Total</span>
              <span>LE {order.total}</span>
            </div>
          </div>

          {/* Change Status */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Update Status</h3>
            <div className="grid grid-cols-2 gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => onStatusChange(order.id, status)}
                  disabled={order.status === status}
                  className={`py-2 px-3 text-sm rounded-lg border transition ${
                    order.status === status
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-50 border-gray-300"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDrawer;