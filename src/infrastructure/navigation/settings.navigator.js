import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { FavouritesScreen, SettingsScreen, CameraScreen } from '../../features';
import { PhotosContextProvider } from '../../services';

const Stack = createStackNavigator();

export const SettingsNavigator = () => {
  return (
    <PhotosContextProvider>
      <Stack.Navigator initialRouteName="SettingsScreen">
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Favourites" component={FavouritesScreen} />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </PhotosContextProvider>
  );
};
