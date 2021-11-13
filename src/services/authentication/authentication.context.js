import React, { createContext, useState } from 'react';

import { loginRequest } from './authentication.service';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((loggedInUser) => {
        setUser(loggedInUser);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };
  return (
    <AuthenticationContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ isAuthenticated: !!user, isLoading, user, error, onLogin }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
