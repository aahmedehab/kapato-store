import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 85;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center">
            <ShoppingCart size={48} className="text-gray-400" />
          </div>
        </div>
        
        <h2 className="text-3xl font-semibold mb-3">Your cart is empty</h2>
        <p className="text-gray-600 max-w-xs mb-10">
          Looks like you haven't added anything yet. 
          Start exploring our collection!
        </p>
        
        <Link 
          to="/shop" 
          className="bg-black hover:bg-gray-800 text-white px-10 py-3.5 rounded-2xl text-base font-medium transition flex items-center gap-2"
        >
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
      <p className="text-gray-500 mb-10">{cart.length} items</p>

      <div className="grid lg:grid-cols-12 gap-12">
        
        {/* Cart Items */}
        <div className="lg:col-span-7 space-y-8">
          {cart.map((item, index) => (
            <div key={index} className="flex gap-6 bg-white p-6 rounded-2xl border">
              <div className="w-28 h-28 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.color}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                      className="w-8 h-8 border rounded-lg hover:bg-gray-100 flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                      className="w-8 h-8 border rounded-lg hover:bg-gray-100 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-bold">LE {item.price * item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white border rounded-2xl p-8 sticky top-8">
            <h3 className="font-semibold text-xl mb-6">Summary</h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>LE {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>LE {shipping}</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>LE {total}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-black text-white text-center py-4 rounded-xl mt-8 font-medium hover:bg-gray-800 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;