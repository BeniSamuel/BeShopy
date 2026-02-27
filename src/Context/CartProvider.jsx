import React, { useState, createContext, useContext, useEffect} from 'react'
import { toast } from 'react-hot-toast';

// Creating the context
export const CartContext = createContext();

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem('beshopy_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('beshopy_cart', JSON.stringify(cartData));
  }, [cartData]);

  const addToCart = (product, quantity = 1) => {
    setCartData((prevCart) => {
      // Check if product already exists in cart
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        // Update quantity if product exists
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity
        };
        toast.success('Updated cart quantity');
        return updatedCart;
      } else {
        // Add new product to cart
        toast.success('Added to cart');
        return [...prevCart, { ...product, quantity }];
      }
    });
  }

  const removeFromCart = (productId) => {
    setCartData((prevCart) => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      toast.success('Removed from cart');
      return updatedCart;
    });
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCartData((prevCart) => {
      const updatedCart = prevCart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      return updatedCart;
    });
  }

  const clearCart = () => {
    setCartData([]);
    toast.success('Cart cleared');
  }

  const getCartTotal = () => {
    return cartData.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  const getCartCount = () => {
    return cartData.reduce((count, item) => count + item.quantity, 0);
  }

  return (
    <CartContext.Provider value={{ 
      cartData, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;