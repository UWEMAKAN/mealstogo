import React from 'react';
import { useTheme } from 'styled-components/native';

import { SafeArea, Spacer, Text } from '../../../components';
import { CartIcon, CartIconContainer } from '../components';

export const CheckoutErrorScreen = ({ route }) => {
  const theme = useTheme();
  const { error = '' } = route.params;
  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon="close" bg={theme.colors.ui.error} />
        <Spacer position="top" size="large">
          <Text variant="label">{error}</Text>
        </Spacer>
      </CartIconContainer>
    </SafeArea>
  );
};
