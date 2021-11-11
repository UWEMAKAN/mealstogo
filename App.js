import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
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

import { RestaurantsScreen, theme } from './src';

const App = () => {
  const [oswaldLoaded] = useOswaldFonts({
    Oswald_400Regular,
  });
  const [latoLoaded] = useLatoFonts({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return <View />;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <RestaurantsScreen />
      </ThemeProvider>
      {/* eslint-disable-next-line react/style-prop-object */}
      <ExpoStatusBar style="auto" />
    </>
  );
};

export default App;
