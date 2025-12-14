// src/context/CardContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCode, setCartCode] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ 1. Initialize cartCode from localStorage (or create one)
  useEffect(() => {
    let existing = localStorage.getItem("cart_code");

    if (!existing) {
      // create a simple unique code – you can change the logic if needed
      existing = `cart_${Date.now()}`;
      localStorage.setItem("cart_code", existing);
    }

    setCartCode(existing);
  }, []);

  // ✅ 2. Fetch cart items using the current cartCode
  const fetchCartItems = async (code = cartCode) => {
    if (!code) return;

    setLoading(true);
    try {
      const res = await api.get(`/cartItems/?cart_code=${code}`);
      setCartItems(res.data);
    } catch (err) {
      console.error("Error fetching cart items:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ 3. When cartCode is ready (also on refresh), load items
  useEffect(() => {
    if (cartCode) {
      fetchCartItems(cartCode);
    }
  }, [cartCode]);

  // total items (sum of quantities)
  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartCode,
        cartItems,
        cartCount,
        fetchCartItems,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
