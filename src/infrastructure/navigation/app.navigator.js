import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { RestaurantsNavigator } from './restaurants.navigator';
import { SettingsNavigator } from './settings.navigator';
import { CheckoutNavigator } from './checkout.navigator';
import { CheckoutScreen, MapScreen } from '../../features';
import {
  CartContextProvider,
  FavouritesContextProvider,
  LocationContextProvider,
  RestaurantsContextProvider,
} from '../../services';

const TAB_ICON = {
  Restaurants: 'md-restaurant',
  Checkout: 'md-cart',
  Map: 'md-map',
  Settings: 'md-settings',
};

const createScreenOptions = ({ route }) => ({
  headerShown: false,
  tabBarIcon: ({ color, size }) => {
    const iconName = TAB_ICON[route.name];
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: 'tomato',
  tabBarInactiveTintColor: 'gray',
});

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <FavouritesContextProvider>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <CartContextProvider>
            <Tab.Navigator
              initialRouteName="Restaurants"
              screenOptions={createScreenOptions}
            >
              <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
              <Tab.Screen name="Checkout" component={CheckoutNavigator} />
              <Tab.Screen name="Map" component={MapScreen} />
              <Tab.Screen name="Settings" component={SettingsNavigator} />
            </Tab.Navigator>
          </CartContextProvider>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavouritesContextProvider>
  );
};
