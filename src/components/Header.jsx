import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';

const Header = () => {
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

const [scrollY, setScrollY] = useState(0);
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    const currentScroll = window.scrollY;

    setScrollY(currentScroll);

    setIsScrolled((prev) => {
      // Hide only after scrolling down enough
      if (!prev && currentScroll > 30) return true;

      // Show again only after scrolling back near the top
      if (prev && currentScroll < 1) return false;

      return prev;
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  return (
    <header className={`bg-white sticky top-0 z-50 transition-all duration-700 ease-out ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Logo + Line */}
        <div 
          className={`transition-all duration-700 ease-out overflow-hidden flex justify-center ${isScrolled ? 'h-0 opacity-0 py-0' : 'h-20 py-6'}`}
        >
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold tracking-[4px] text-[#B71C1C]">KAPATO</h1>
            <div className="h-px bg-[#C8B39A] w-80 mt-4"></div>
          </div>
        </div>

        {/* Navigation Bar - Always visible but moves up smoothly */}
        <div className="flex justify-between items-center py-4">
          <nav className="flex-1 flex justify-center">
            <div className="flex items-center gap-10 text-sm font-medium tracking-wider">
              <NavLink 
                to="/" 
                className={({ isActive }) => `transition-colors ${isActive ? "text-[#B71C1C]" : "text-black hover:text-[#B71C1C]"}`}
              >
                HOME
              </NavLink>
              <NavLink 
                to="/shop" 
                className={({ isActive }) => `transition-colors ${isActive ? "text-[#B71C1C]" : "text-black hover:text-[#B71C1C]"}`}
              >
                SHOP
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => `transition-colors ${isActive ? "text-[#B71C1C]" : "text-black hover:text-[#B71C1C]"}`}
              >
                ABOUT
              </NavLink>
            </div>
          </nav>

          <NavLink to="/cart" className="relative flex items-center gap-2 text-black hover:text-[#B71C1C] transition">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#B71C1C] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>
<div
  className={`h-px w-[90%] mx-auto transition-all duration-700 ${
    isScrolled ? "opacity-0" : "opacity-100 bg-[#C8B39A]"
  }`}
/>    </header>
  );
};

export default Header;