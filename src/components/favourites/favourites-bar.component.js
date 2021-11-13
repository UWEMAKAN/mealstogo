import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { CompactRestaurantInfo } from '../restaurant';
import { Spacer } from '../spacer';
import { Text } from '../typography';

const FavouritesWrapper = styled.View`
  padding: 10px;
`;

export const FavouritesBar = ({ favourites, onNavigate }) => {
  if (!favourites.length) return null;
  return (
    <FavouritesWrapper>
      <Spacer position="left" size="medium">
        <Text variant="caption">Favourites</Text>
      </Spacer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favourites.map((restaurant) => {
          const key = `${restaurant.placeId}-${restaurant.name}`;
          return (
            <Spacer position="left" size="medium" key={key}>
              <TouchableOpacity
                onPress={() => {
                  onNavigate('RestaurantDetail', { restaurant });
                }}
              >
                <CompactRestaurantInfo restaurant={restaurant} />
              </TouchableOpacity>
            </Spacer>
          );
        })}
      </ScrollView>
    </FavouritesWrapper>
  );
};
