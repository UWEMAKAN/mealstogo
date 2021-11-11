import React from 'react';
import { FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import styled from 'styled-components/native';
import { Spacer, SafeArea } from '../../../components';

import { RestaurantInfoCard } from '../components';

const SearchBarContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
})``;

export const RestaurantsScreen = () => {
  return (
    <SafeArea>
      <SearchBarContainer>
        <Searchbar />
      </SearchBarContainer>
      <RestaurantList
        data={[
          { key: '1' },
          { key: '2' },
          { key: '3' },
          { key: '4' },
          { key: '5' },
          { key: '6' },
          { key: '7' },
          { key: '8' },
          { key: '9' },
          { key: '10' },
          { key: '11' },
          { key: '12' },
          { key: '13' },
          { key: '14' },
          { key: '15' },
        ]}
        renderItem={() => (
          <Spacer position="bottom" size="large">
            <RestaurantInfoCard />
          </Spacer>
        )}
        keyExtractor={(item) => item.key}
      />
    </SafeArea>
  );
};
