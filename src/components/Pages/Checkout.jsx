import { useCart } from '../../context/CartContext';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EMAILJS_CONFIG } from "../../config/emailjs";

const Checkout = () => {
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    governorate: 'Cairo',
    postalCode: '',
    phone: '',
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 85;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompleteOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderDetails = cart.map(item =>
      `${item.name} (${item.color} - ${item.sku}) x${item.quantity} = LE ${item.price * item.quantity}`
    ).join("\n");

    const templateParams = {
      to_email: "ahmedehabahmed2004@gmail.com",
      order_id: "KAPATO-" + Date.now().toString().slice(-6),
      customer_name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      address: `${formData.address}, ${formData.apartment ? formData.apartment + ', ' : ''}${formData.city}, ${formData.governorate}`,
      items: orderDetails,
      subtotal: subtotal,
      shipping: shipping,
      total: total,
    };

  try {
await Promise.all([
  emailjs.send(
    EMAILJS_CONFIG.SERVICE_ID,
    EMAILJS_CONFIG.CUSTOMER_TEMPLATE_ID,
    templateParams,
    EMAILJS_CONFIG.PUBLIC_KEY
  ),
  emailjs.send(
    EMAILJS_CONFIG.SERVICE_ID,
    EMAILJS_CONFIG.ADMIN_TEMPLATE_ID,
    templateParams,
    EMAILJS_CONFIG.PUBLIC_KEY
  ),
]);

      alert("✅ Order placed successfully! Check your email.");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to send order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Compact Header */}
      <div className="border-b">
        <div className="max-w-[1000px] mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">KAPATO</Link>
          <Link to="/cart">
            <ShoppingCart size={24} />
          </Link>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-10">
          
          {/* Left Side - Form */}
          <div>
            <form onSubmit={handleCompleteOrder} className="space-y-6">
              <div>
                <h2 className="font-semibold text-base mb-3">Contact</h2>
                <input type="email" name="email" required placeholder="Email" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm" value={formData.email} onChange={handleChange} />
              </div>

              <div>
                <h2 className="font-semibold text-base mb-3">Delivery</h2>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input type="text" name="firstName" required placeholder="First name" className="border border-gray-300 rounded-xl px-4 py-3 text-sm" value={formData.firstName} onChange={handleChange} />
                  <input type="text" name="lastName" required placeholder="Last name" className="border border-gray-300 rounded-xl px-4 py-3 text-sm" value={formData.lastName} onChange={handleChange} />
                </div>
                <input type="text" name="address" required placeholder="Address" className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-3 text-sm" value={formData.address} onChange={handleChange} />
                <input type="text" name="apartment" placeholder="Apartment, suite, etc. (optional)" className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-3 text-sm" value={formData.apartment} onChange={handleChange} />

                <div className="grid grid-cols-3 gap-3">
                  <input type="text" name="city" required placeholder="City" className="border border-gray-300 rounded-xl px-4 py-3 text-sm" value={formData.city} onChange={handleChange} />
                  <select name="governorate" required className="border border-gray-300 rounded-xl px-4 py-3 text-sm" value={formData.governorate} onChange={handleChange}>
                    <option value="Cairo">Cairo</option>
                    <option value="Giza">Giza</option>
                    {/* <option value="Alexandria">Alexandria</option>
                    <option value="Dakahlia">Dakahlia</option> */}
                  </select>
                  <input type="text" name="postalCode" placeholder="Postal code (optional)" className="border border-gray-300 rounded-xl px-4 py-3 text-sm" value={formData.postalCode} onChange={handleChange} />
                </div>

                <input type="tel" name="phone" required placeholder="Phone" className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-3 text-sm" value={formData.phone} onChange={handleChange} />
              </div>

              <div>
                <h2 className="font-semibold text-base mb-3">Shipping method</h2>
                <div className="border border-blue-500 bg-blue-50 rounded-2xl px-4 py-3 flex justify-between items-center text-sm">
                  <div>
                    <p className="font-medium">Standard</p>
                  </div>
                  <p className="font-medium">LE {shipping}</p>
                </div>
              </div>

              <div>
                <h2 className="font-semibold text-base mb-3">Payment</h2>
                <div className="border border-blue-500 bg-blue-50 rounded-2xl px-4 py-3 text-sm">
                  <p className="font-medium">Cash on Delivery (COD)</p>
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-3 rounded-2xl text-base font-medium transition mt-6"
              >
                {loading ? "Sending Order..." : "Complete Order"}
              </button>
            </form>
          </div>

          {/* Right Side - Gray */}
          <div className="bg-gray-100 p-8 rounded-3xl h-fit sticky top-8">
            <h2 className="font-semibold text-lg mb-6">Order Summary</h2>

            {cart.map((item) => (
              <div key={item.sku} className="flex gap-4 py-4 border-b last:border-none">
                <div className="w-14 h-14 bg-white rounded-lg overflow-hidden border flex-shrink-0">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500">{item.color} • Qty: {item.quantity}</p>
                </div>
                <p className="font-medium text-sm">LE {item.price * item.quantity}</p>
              </div>
            ))}

            <div className="mt-8 space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>LE {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>LE {shipping}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-4 border-t">
                <span>Total</span>
                <span>LE {total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;