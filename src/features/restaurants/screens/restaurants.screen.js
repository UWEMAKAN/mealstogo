import React, { useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import styled from 'styled-components/native';

import { RestaurantsContext, FavouritesContext } from '../../../services';
import {
  Spacer,
  SafeArea,
  FavouritesBar,
  FadeInView,
} from '../../../components';
import { RestaurantInfoCard, Search, RestaurantsList } from '../components';

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

export const RestaurantsScreen = ({ navigation }) => {
  const { restaurants, isLoading } = useContext(RestaurantsContext);
  const [isToggled, setIsToggled] = useState(false);
  const { favourites } = useContext(FavouritesContext);

  return (
    <SafeArea>
      <Search
        onFavouritesToggled={() => {
          setIsToggled(!isToggled);
        }}
        isFavouriteToggled={isToggled}
      />
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}
      {isLoading ? (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      ) : (
        <RestaurantsList
          data={restaurants}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RestaurantDetail', { restaurant: item })
              }
            >
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <RestaurantInfoCard restaurant={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => `${item.placeId}-${item.name}`}
        />
      )}
    </SafeArea>
  );
};
