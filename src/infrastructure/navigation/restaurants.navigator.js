import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { RestaurantsScreen, RestaurantDetail } from '../../features';

const Stack = createStackNavigator();

export const RestaurantsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
        headerShown: false,
      }}
    >
      <Stack.Screen name="RestaurantsList" component={RestaurantsScreen} />
      <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
    </Stack.Navigator>
  );
};
