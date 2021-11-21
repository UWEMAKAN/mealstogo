import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  CheckoutErrorScreen,
  CheckoutSuccessScreen,
  CheckoutScreen,
} from '../../features';

const Stack = createStackNavigator();

export const CheckoutNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="CheckoutScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="CheckoutSuccess" component={CheckoutSuccessScreen} />
      <Stack.Screen name="CheckoutError" component={CheckoutErrorScreen} />
    </Stack.Navigator>
  );
};
