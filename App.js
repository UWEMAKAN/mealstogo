import 'react-native-gesture-handler';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import {
  useFonts as useOswaldFonts,
  Oswald_400Regular,
} from '@expo-google-fonts/oswald';
import {
  useFonts as useLatoFonts,
  Lato_400Regular,
} from '@expo-google-fonts/lato';
import { getApps, initializeApp } from 'firebase/app';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

import {
  theme,
  RestaurantsContextProvider,
  LocationContextProvider,
  FavouritesContextProvider,
  Navigation,
} from './src';

const firebaseConfig = {
  apiKey: 'AIzaSyBa94O9-RjlKyINm38litQZZDeaAq7tlXc',
  authDomain: 'mealstogo-2fc9c.firebaseapp.com',
  projectId: 'mealstogo-2fc9c',
  storageBucket: 'mealstogo-2fc9c.appspot.com',
  messagingSenderId: '442076299911',
  appId: '1:442076299911:web:83ef0c2fc6f19399ecae22',
};
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}
const auth = getAuth(app);
const App = () => {
  const [oswaldLoaded] = useOswaldFonts({
    Oswald_400Regular,
  });
  const [latoLoaded] = useLatoFonts({
    Lato_400Regular,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    signInWithEmailAndPassword(auth, 'uwemakan@gmail.com', 'test123')
      .then((user) => {
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.log('Error from Auth Firebase');
        console.log(err.message);
      });
  }, []);

  if (!oswaldLoaded || !latoLoaded) {
    return <View />;
  }

  if (!isAuthenticated) return null;

  return (
    <>
      <ThemeProvider theme={theme}>
        <FavouritesContextProvider>
          <LocationContextProvider>
            <RestaurantsContextProvider>
              <Navigation />
            </RestaurantsContextProvider>
          </LocationContextProvider>
        </FavouritesContextProvider>
      </ThemeProvider>
      {/* eslint-disable-next-line react/style-prop-object */}
      <ExpoStatusBar style="auto" />
    </>
  );
};

export default App;
