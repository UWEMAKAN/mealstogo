import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthenticationContext } from '../authentication';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [cart, setCart] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [sum, setSum] = useState(0);

  const saveCart = async (rst, crt, uid) => {
    try {
      const jsonString = JSON.stringify({ restaurant: rst, cart: crt });
      await AsyncStorage.setItem(`@cart-${uid}`, jsonString);
    } catch (e) {}
  };

  const loadCart = async (uid) => {
    try {
      const jsonString = await AsyncStorage.getItem(`@cart-${uid}`);
      if (jsonString) {
        const jsonValue = JSON.parse(jsonString);
        setRestaurant(jsonValue.restaurant);
        setCart(jsonValue.cart);
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (user && user.uid) {
      loadCart(user.uid).then();
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid) {
      saveCart(restaurant, cart, user.uid).then();
    }
  }, [restaurant, cart, user]);

  useEffect(() => {
    const total = cart.reduce((prev, { price }) => prev + price, 0);
    setSum(total);
  }, [cart]);

  const add = (item, rst) => {
    if (!restaurant || restaurant.placeId !== rst.placeId) {
      setRestaurant(rst);
      setCart([item]);
    } else {
      setCart([...cart, item]);
    }
  };

  const clear = () => {
    setCart([]);
    setRestaurant(null);
  };

  return (
    <CartContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        cart,
        sum,
        restaurant,
        addToCart: add,
        clearCart: clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
