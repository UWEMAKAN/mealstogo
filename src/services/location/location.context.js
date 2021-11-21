import React, { createContext, useState, useEffect } from 'react';

import { locationRequest, locationTransform } from './location.service';

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [keyword, setKeyword] = useState('San Francisco');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  useEffect(() => {
    if (keyword.length) {
      locationRequest(keyword.toLowerCase())
        .then(locationTransform)
        .then((result) => {
          setError(null);
          setIsLoading(false);
          setLocation(result);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    }
  }, [keyword]);

  return (
    <LocationContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        location,
        isLoading,
        error,
        keyword,
        search: onSearch,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
