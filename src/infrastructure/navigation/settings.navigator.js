import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { FavouritesScreen, SettingsScreen } from '../../features';

const Stack = createStackNavigator();

export const SettingsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SettingsScreen">
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Favourites" component={FavouritesScreen} />
    </Stack.Navigator>
  );
};
