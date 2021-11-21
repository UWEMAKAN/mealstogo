import { FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import styled from 'styled-components/native';

export const RestaurantsList = styled(FlatList).attrs({
  contentContainerStyle: {
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
})``;

export const OrderButton = styled(Button).attrs(({ theme }) => ({
  color: theme.colors.brand.primary,
}))`
  padding: ${({ theme }) => theme.space[2]};
  margin: 0 ${({ theme }) => theme.space[3]};
`;
