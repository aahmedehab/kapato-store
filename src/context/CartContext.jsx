import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.findIndex(item => item.id === product.id);

      if (existingItem !== -1) {
        // لو موجود → زود الكمية اللي جاية
        const updatedCart = [...prevCart];
        updatedCart[existingItem].quantity += product.quantity || 1;
        return updatedCart;
      } else {
        // لو جديد → أضفه بالكمية
        return [...prevCart, { 
          ...product, 
          quantity: product.quantity || 1 
        }];
      }
    });
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prev => {
      const updated = [...prev];
      updated[index].quantity = newQuantity;
      return updated;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);