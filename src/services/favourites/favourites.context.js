import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticationContext } from '../authentication';

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const { user } = useContext(AuthenticationContext);

  const saveFavourites = async (uid, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
    } catch (e) {
      console.log(`Error Storing: ${e}`);
    }
  };

  const loadFavourites = async (uid) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@favourites-${uid}`);
      jsonValue && setFavourites(JSON.parse(jsonValue));
    } catch (e) {
      console.log(`Error Loading: ${e}`);
    }
  };

  const add = (restaurant) => {
    setFavourites([...favourites, restaurant]);
  };

  const remove = (restaurant) => {
    const newFavourites = favourites.filter(
      (r) => r.placeId !== restaurant.placeId,
    );
    setFavourites(newFavourites);
  };

  useEffect(() => {
    if (user) {
      loadFavourites(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      saveFavourites(user.uid, favourites);
    }
  }, [favourites, user]);

  return (
    <FavouritesContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        favourites,
        addToFavourites: add,
        removeFromFavourites: remove,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
