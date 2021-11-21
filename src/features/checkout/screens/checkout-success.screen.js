import React from 'react';

import { SafeArea, Spacer, Text } from '../../../components';
import { CartIcon, CartIconContainer } from '../components';

export const CheckoutSuccessScreen = () => {
  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon="check-bold" />
        <Spacer position="top" size="large">
          <Text variant="label">Payment Successful!</Text>
        </Spacer>
      </CartIconContainer>
    </SafeArea>
  );
};
