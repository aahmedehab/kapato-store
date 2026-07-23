import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Nav = () => {
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const [animateCart, setAnimateCart] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (cartCount === 0) return;
    setAnimateCart(true);
    const timer = setTimeout(() => setAnimateCart(false), 500);
    return () => clearTimeout(timer);
  }, [cartCount]);

  return (
    <>
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

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-primary">
            <Link to="/shop" className="hover:underline transition">SHOP</Link>
            <Link to="/about" className="hover:underline transition">ABOUT</Link>
            <Link to="/contact" className="hover:underline transition">CONTACT</Link>
          </div>

          {/* Right Side: Cart + Burger */}
          <div className="flex items-center gap-5">
            {/* Cart */}
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
                <span className={`absolute -top-1 -right-1 bg-primary text-secondary text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full ${animateCart ? "animate-cart-badge" : ""}`}>
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Burger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-primary"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div className={`fixed top-0 right-0 h-screen w-80 bg-secondary shadow-2xl z-[60] transform transition-transform duration-500 md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        <div className="flex justify-between items-center p-6 border-b border-primary-70">
          <h2 className="text-2xl font-bold text-primary">Menu</h2>
          <button onClick={() => setMenuOpen(false)} className="text-primary">
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col p-6 gap-8 text-xl font-medium text-primary">
          <Link to="/shop" onClick={() => setMenuOpen(false)} className="hover:text-primary-dark transition">SHOP</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-primary-dark transition">ABOUT</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-primary-dark transition">CONTACT</Link>
        </div>
      </div>

      {/* Full Page Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Nav;