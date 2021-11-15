import React, { createContext, useState } from 'react';
import { getApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

import { loginRequest, registerRequest } from './authentication.service';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const app = getApp();
  const auth = getAuth(app);
  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  const onLogout = () => {
    setUser(null);
    signOut(auth);
  };

  const onRegister = (email, password, confirmPassword) => {
    setIsLoading(true);
    registerRequest(email, password, confirmPassword)
      .then((u) => {
        setUser(u);
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
      value={{
        isAuthenticated: !!user,
        isLoading,
        user,
        error,
        onLogin,
        onLogout,
        onRegister,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
