import { createContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'cart';

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // Persist to localStorage every time the cart changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (food, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.food._id === food._id);

      if (existing) {
        return prev.map((item) =>
          item.food._id === food._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { food, quantity }];
    });
  };

  const removeItem = (foodId) => {
    setItems((prev) => prev.filter((item) => item.food._id !== foodId));
  };

  const updateQuantity = (foodId, quantity) => {
    if (quantity < 1) {
      removeItem(foodId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.food._id === foodId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;