import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';

const Nav = () => {
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
const [animateCart, setAnimateCart] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  useEffect(() => {
  if (cartCount === 0) return;

  setAnimateCart(true);

  const timer = setTimeout(() => {
    setAnimateCart(false);
  }, 500);

  return () => clearTimeout(timer);
}, [cartCount]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-secondary-80 backdrop-blur-md shadow-md py-4' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/">
          <img
            src="/images/logo/kapato logo primary.png"
            alt="KAPATO Logo"
            className="h-5 lg:h-6 w-auto"
          />
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-primary">
          <Link to="/shop" className="hover:underline transition">
            SHOP
          </Link>
          <Link to="/about" className="hover:underline transition">
            ABOUT
          </Link>
          <Link to="/contact" className="hover:underline transition">
            CONTACT
          </Link>
        </div>

        {/* Cart Icon */}
<Link
  to="/cart"
  className="text-primary relative flex items-center hover:text-primary-hover transition-colors duration-300"
>
  <ShoppingCart
    size={24}
    strokeWidth={2}
    className={animateCart ? "animate-cart" : ""}
  />

  {cartCount > 0 && (
    <span
      className={`absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full ${
        animateCart ? "animate-cart-badge" : ""
      }`}
    >
      {cartCount}
    </span>
  )}
</Link>
      </div>
    </nav>
  );
};

export default Nav;