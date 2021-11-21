import React, { useContext, useState } from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';

import { SafeArea, Spacer, Text } from '../../../components';
import {
  CartIcon,
  CartIconContainer,
  ClearButton,
  CreditCardInput,
  CreditCardInputContainer,
  NameInput,
  PayButton,
  PaymentProcessing,
} from '../components';
import { RestaurantInfoCard } from '../../restaurants';
import { CartContext, paymentRequest } from '../../../services';

export const CheckoutScreen = ({ navigation }) => {
  const { cart, clearCart, restaurant, sum } = useContext(CartContext);
  const [name, setName] = useState('');
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onPay = () => {
    setIsLoading(true);
    if (!card || !card.id) {
      setIsLoading(false);
      navigation.navigate('CheckoutError', {
        error: 'Please fill in a valid credit card',
      });
      return;
    }
    paymentRequest(sum, name, card.id)
      .then((result) => {
        setIsLoading(false);
        clearCart();
        navigation.navigate('CheckoutSuccess');
      })
      .catch((e) => {
        setIsLoading(false);
        navigation.navigate('CheckoutError', {
          error: e.message,
        });
      });
  };

  if (!cart.length || !restaurant) {
    return (
      <SafeArea>
        <CartIconContainer>
          <CartIcon icon="cart-off" />
          <Spacer position="top" size="large">
            <Text>Your cart is empty!</Text>
          </Spacer>
        </CartIconContainer>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      {isLoading && <PaymentProcessing />}
      <ScrollView>
        <Spacer position="left" size="large">
          <Spacer position="top" size="large">
            <Text>Your Order</Text>
            <List.Section>
              {cart.map(({ item, price }, index) => (
                <List.Item
                  key={`${restaurant.placeId}-${index + 1}`}
                  title={`${item} - $${price / 100}`}
                />
              ))}
            </List.Section>
            <Text>Total: ${sum / 100}</Text>
          </Spacer>
        </Spacer>
        <Spacer position="top" size="large">
          <NameInput
            label="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </Spacer>
        <Spacer position="top" size="large">
          <CreditCardInputContainer>
            {name.length > 0 && (
              <CreditCardInput
                name={name}
                onSuccess={(c) => setCard(c)}
                onError={() => {
                  navigation.navigate('CheckoutError', {
                    error: 'Something went wrong processing your credit card',
                  });
                }}
              />
            )}
          </CreditCardInputContainer>
        </Spacer>
        <Spacer position="top" size="xxlarge">
          <PayButton
            icon="cash-usd"
            mode="contained"
            onPress={onPay}
            disabled={isLoading}
          >
            Pay Now
          </PayButton>
        </Spacer>
        <Spacer position="bottom" size="xlarge">
          <Spacer position="top" size="large">
            <ClearButton
              icon="cart-off"
              mode="contained"
              onPress={clearCart}
              disabled={isLoading}
            >
              Clear Cart
            </ClearButton>
          </Spacer>
        </Spacer>
      </ScrollView>
    </SafeArea>
  );
};
