import { createContext, useEffect, useState } from 'react';

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const deleteCartItem = (cartItems, itemToRemove) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === itemToRemove.id
      );
    
    if(existingCartItem.quantity === 1){
        return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
      }

    return cartItems.map((cartItem) =>
      cartItem.id === itemToRemove.id
      ? {...cartItem, quantity: cartItem.quantity - 1}
      : cartItem
    );
}

export const clearCartItem = (cartItems, itemId) => {
    return cartItems.filter((cartItem) => cartItem.id !== itemId);
}



export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  deleteItemFromCart: () => {},
  cartCount: 0,
  clearACartItem: () => {},
  cartTotal: 0,
  addCartTotal: () => {}
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    setCartCount(newCartCount);
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (product) =>
    setCartItems(addCartItem(cartItems, product));

    const deleteItemFromCart = (item) =>
    setCartItems(deleteCartItem(cartItems, item));

    const clearACartItem = (item) =>
    setCartItems(clearCartItem(cartItems, item));

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, deleteItemFromCart, clearACartItem, cartCount, cartTotal};

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};