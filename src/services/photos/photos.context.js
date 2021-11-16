import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthenticationContext } from '../authentication';

export const PhotosContext = createContext();

export const PhotosContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [photo, setPhoto] = useState(null);

  const saveProfilePhoto = async (p) => {
    try {
      await AsyncStorage.setItem(`${user.uid}-photo`, p);
      setPhoto(p);
    } catch (err) {
      return err.message;
    }
  };

  const loadProfilePhoto = (uid) => {
    return AsyncStorage.getItem(`${uid}-photo`)
      .then((p) => {
        return p;
      })
      .catch(() => {
        return 'no photo to load';
      });
  };

  useEffect(() => {
    loadProfilePhoto(user.uid).then((p) => setPhoto(p));
  }, [user]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <PhotosContext.Provider value={{ photo, saveProfilePhoto }}>
      {children}
    </PhotosContext.Provider>
  );
};
