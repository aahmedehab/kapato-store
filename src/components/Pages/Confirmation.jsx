import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const Confirmation = () => {
  const location = useLocation();
  const data = location.state;

  // If someone opens /confirmation directly without data → redirect home
  if (!data) {
    return <Navigate to="/" replace />;
  }

  const { orderId, formData, cart, subtotal, shipping, total } = data;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1100px] mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* LEFT SIDE - Confirmation Content */}
          <div className="lg:col-span-3">
            {/* Thank you header */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-full border-2 border-gray-800 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={28} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Confirmation #{orderId}</p>
                <h1 className="text-2xl font-semibold mt-1">
                  Thank you, {formData.firstName}!
                </h1>
              </div>
            </div>

            {/* Order confirmed box */}
            <div className="border border-gray-200 rounded-2xl p-5 mb-6">
              <h2 className="font-semibold text-base mb-1">Your order is confirmed</h2>
              <p className="text-sm text-gray-600">You'll receive a confirmation email soon</p>
            </div>

            {/* Order details */}
            <div className="border border-gray-200 rounded-2xl p-6">
              <h2 className="font-semibold text-base mb-5">Order details</h2>

              <div className="grid sm:grid-cols-2 gap-8 text-sm">
                {/* Contact information */}
                <div>
                  <p className="font-medium mb-1.5">Contact information</p>
                  <p className="text-gray-700">{formData.email}</p>
                </div>

                {/* Payment method */}
                <div>
                  <p className="font-medium mb-1.5">Payment method</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-5 bg-gray-100 rounded flex items-center justify-center text-xs">
                      $
                    </div>
                    <span>Cash on Delivery (COD) · E£{total.toFixed(2)} EGP</span>
                  </div>
                </div>

                {/* Shipping address */}
                <div>
                  <p className="font-medium mb-1.5">Shipping address</p>
                  <p className="text-gray-700 leading-relaxed">
                    {formData.firstName} {formData.lastName}<br />
                    {formData.address}
                    {formData.apartment && <><br />{formData.apartment}</>}
                    <br />
                    {formData.city}<br />
                    {formData.governorate}<br />
                    Egypt<br />
                    {formData.phone}
                  </p>
                </div>

                {/* Billing address */}
                <div>
                  <p className="font-medium mb-1.5">Billing address</p>
                  <p className="text-gray-700 leading-relaxed">
                    {formData.firstName} {formData.lastName}<br />
                    {formData.address}
                    {formData.apartment && <><br />{formData.apartment}</>}
                    <br />
                    {formData.city}<br />
                    {formData.governorate}<br />
                    Egypt<br />
                    {formData.phone}
                  </p>
                </div>

                {/* Shipping method */}
                <div>
                  <p className="font-medium mb-1.5">Shipping method</p>
                  <p className="text-gray-700">Standard</p>
                </div>
              </div>
            </div>

            {/* Bottom actions */}
            <div className="flex items-center justify-between mt-10">
              <p className="text-sm text-gray-600">
                Need help? <Link to="/contact" className="underline">Contact us</Link>
              </p>
              <Link
                to="/"
                className="bg-black text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
              >
                Continue shopping
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE - Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-8">
              {/* Products */}
              <div className="space-y-5 mb-6">
                {cart.map((item) => (
                  <div key={item.sku} className="flex gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-white rounded-xl overflow-hidden border">
                        <img
                          src={`/images/${item.img}`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-600 text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.color}</p>
                    </div>
                    <p className="text-sm font-medium">E£{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 text-sm border-t pt-5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>E£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>E£{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-3 border-t">
                  <span>Total</span>
                  <span>
                    <span className="text-xs text-gray-500 mr-1">EGP</span>
                    E£{total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;