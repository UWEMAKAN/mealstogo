import React from 'react';
import { StatusBar } from 'react-native';
import { Searchbar } from 'react-native-paper';
import styled from 'styled-components';

import { RestaurantInfoCard } from '../components';

const SafeArea = styled.SafeAreaView`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px;`}
`;

const SearchBarContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const RestaurantListContainer = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const RestaurantsScreen = () => {
  return (
    <SafeArea>
      <SearchBarContainer>
        <Searchbar />
      </SearchBarContainer>
      <RestaurantListContainer>
        <RestaurantInfoCard restaurant={{}} />
      </RestaurantListContainer>
    </SafeArea>
  );
};
