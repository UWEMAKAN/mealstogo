import React, { useContext, useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import styled from 'styled-components/native';

import { LocationContext } from '../../../services';

const SearchBarContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const Search = ({ onFavouritesToggled, isFavouriteToggled }) => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchBarContainer>
      <Searchbar
        icon={isFavouriteToggled ? 'heart' : 'heart-outline'}
        onIconPress={() => {
          onFavouritesToggled();
        }}
        placeholder="Search for a location"
        value={searchKeyword}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchBarContainer>
  );
};
