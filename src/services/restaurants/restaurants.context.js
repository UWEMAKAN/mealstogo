import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from 'react';

import {
  restaurantsRequest,
  restaurantsTransform,
} from './restaurants.service';
import { LocationContext } from '../location';

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);

  const retrieveRestaurants = (loc) => {
    setIsLoading(true);
    setRestaurants([]);
    setTimeout(() => {
      restaurantsRequest(loc)
        .then(restaurantsTransform)
        .then((results) => {
          setIsLoading(false);
          setRestaurants(results);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    }, 1000);
  };

  useEffect(() => {
    if (location) {
      const { lat, lng } = location;
      const locationString = `${lat},${lng}`;
      retrieveRestaurants(locationString);
    }
  }, [location]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <RestaurantsContext.Provider value={{ restaurants, isLoading, error }}>
      {children}
    </RestaurantsContext.Provider>
  );
};
