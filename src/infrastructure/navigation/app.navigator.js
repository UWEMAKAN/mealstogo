import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import styled from 'styled-components/native';

import { SafeArea, Text } from '../../components';
import { MapScreen } from '../../features';
import { RestaurantsNavigator } from './restaurants.navigator';
import {
  AuthenticationContext,
  RestaurantsContextProvider,
  LocationContextProvider,
  FavouritesContextProvider,
} from '../../services';

export const AuthButton = styled(Button).attrs(({ theme }) => ({
  color: theme.colors.brand.primary,
}))`
  padding: ${({ theme }) => theme.space[2]};
  width: 150px;
  align-self: center;
`;

const Settings = () => {
  const { onLogout } = useContext(AuthenticationContext);
  return (
    <SafeArea>
      <Text>Settings</Text>
      <AuthButton icon="power" mode="contained" onPress={() => onLogout()}>
        logout
      </AuthButton>
    </SafeArea>
  );
};

const TAB_ICON = {
  Restaurants: 'md-restaurant',
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
          <Tab.Navigator
            initialRouteName="Restaurants"
            screenOptions={createScreenOptions}
          >
            <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Settings" component={Settings} />
          </Tab.Navigator>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavouritesContextProvider>
  );
};
