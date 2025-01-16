import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Create a unique identifier for the item based on id and variants
      const itemKey = product.variants 
        ? `${product.id}-${product.variants.size || ''}-${product.variants.color || ''}`
        : `${product.id}`;

      const existingItem = prevItems.find(item => {
        const currentItemKey = item.variants 
          ? `${item.id}-${item.variants.size || ''}-${item.variants.color || ''}`
          : `${item.id}`;
        return itemKey === currentItemKey;
      });

      if (existingItem) {
        return prevItems.map(item => {
          const currentItemKey = item.variants 
            ? `${item.id}-${item.variants.size || ''}-${item.variants.color || ''}`
            : `${item.id}`;
          return itemKey === currentItemKey
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      }

      // Add new item with itemKey
      return [...prevItems, { ...product, quantity: 1, itemKey }];
    });
  };

  const updateQuantity = (itemKey, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        const currentItemKey = item.variants 
          ? `${item.id}-${item.variants.size || ''}-${item.variants.color || ''}`
          : `${item.id}`;
        return currentItemKey === itemKey ? { ...item, quantity } : item;
      })
    );
  };

  const removeFromCart = (itemKey) => {
    setCartItems(prevItems => 
      prevItems.filter(item => {
        const currentItemKey = item.variants 
          ? `${item.id}-${item.variants.size || ''}-${item.variants.color || ''}`
          : `${item.id}`;
        return currentItemKey !== itemKey;
      })
    );
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      emptyCart,
      cartCount,
      cartTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
