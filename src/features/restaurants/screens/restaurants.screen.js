import React, { useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import styled from 'styled-components/native';

import {
  RestaurantsContext,
  FavouritesContext,
  LocationContext,
} from '../../../services';
import {
  Spacer,
  SafeArea,
  FavouritesBar,
  FadeInView,
  Text,
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

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const RestaurantsScreen = ({ navigation }) => {
  const { restaurants, isLoading, error } = useContext(RestaurantsContext);
  const { error: locationError } = useContext(LocationContext);
  const [isToggled, setIsToggled] = useState(false);
  const { favourites } = useContext(FavouritesContext);
  const hasError = !!error || !!locationError;

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
      ) : hasError ? (
        <ErrorContainer>
          <Text variant="error">Something went wrong</Text>
        </ErrorContainer>
      ) : (
        <RestaurantsList
          data={restaurants}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RestaurantDetail', {
                  restaurant: item,
                })
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
