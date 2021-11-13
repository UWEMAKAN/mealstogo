import React, { useContext } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import styled from 'styled-components/native';

import { RestaurantsContext } from '../../../services';
import { Spacer, SafeArea } from '../../../components';
import { RestaurantInfoCard, Search } from '../components';

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
})``;

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

  return (
    <SafeArea>
      <Search />
      {isLoading ? (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      ) : (
        <RestaurantList
          data={restaurants}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RestaurantDetail', { restaurant: item })
              }
            >
              <Spacer position="bottom" size="large">
                <RestaurantInfoCard restaurant={item} />
              </Spacer>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => `${item.placeId}-${item.name}`}
        />
      )}
    </SafeArea>
  );
};
