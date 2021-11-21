/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState } from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import styled from 'styled-components/native';

import { SafeArea, Spacer } from '../../../components';
import { RestaurantInfoCard, OrderButton } from '../components';
import { CartContext } from '../../../services';

const BreakfastIcon = (props) => <List.Icon {...props} icon="bread-slice" />;
const LunchIcon = (props) => <List.Icon {...props} icon="hamburger" />;
const DinnerIcon = (props) => <List.Icon {...props} icon="food-variant" />;
const DrinksIcon = (props) => <List.Icon {...props} icon="cup" />;

const ListAccordion = styled(List.Accordion).attrs(({ theme }) => ({
  titleStyle: {
    fontSize: theme.fontSizesNoPx.body,
    fontFamily: theme.fonts.heading,
  },
}))``;

const ListItem = styled(List.Item).attrs(({ theme }) => ({
  titleStyle: {
    fontSize: theme.fontSizesNoPx.body,
    fontFamily: theme.fonts.body,
  },
}))``;

export const RestaurantDetail = ({ route, navigation }) => {
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);
  const { addToCart } = useContext(CartContext);

  const { restaurant } = route.params;
  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      <ScrollView>
        <ListAccordion
          title="Breakfast"
          left={BreakfastIcon}
          expanded={breakfastExpanded}
          onPress={() => setBreakfastExpanded(!breakfastExpanded)}
        >
          <ListItem title="Eggs Benedict" />
          <ListItem title="Classic Breakfast" />
        </ListAccordion>
        <ListAccordion
          title="Lunch"
          left={LunchIcon}
          expanded={lunchExpanded}
          onPress={() => setLunchExpanded(!lunchExpanded)}
        >
          <ListItem title="Burger w/ Fries" />
          <ListItem title="Steak Sandwich" />
          <ListItem title="Mushroom Soup" />
        </ListAccordion>
        <ListAccordion
          title="Dinner"
          left={DinnerIcon}
          expanded={dinnerExpanded}
          onPress={() => setDinnerExpanded(!dinnerExpanded)}
        >
          <ListItem title="Spaghetti Bolognese" />
          <ListItem title="Veal Cutlet with Chicken Mushroom Rotini" />
          <ListItem title="Steak Frites" />
        </ListAccordion>
        <ListAccordion
          title="Drinks"
          left={DrinksIcon}
          expanded={drinksExpanded}
          onPress={() => setDrinksExpanded(!drinksExpanded)}
        >
          <ListItem title="Coffee" />
          <ListItem title="Tea" />
          <ListItem title="Modelo" />
          <ListItem title="Coke" />
          <ListItem title="Fanta" />
        </ListAccordion>
      </ScrollView>
      <Spacer position="bottom" size="xlarge">
        <OrderButton
          icon="cash-usd"
          mode="contained"
          onPress={() => {
            addToCart({ item: 'Special', price: 1299 }, restaurant);
            navigation.navigate('Checkout');
          }}
        >
          Order special only $12.99
        </OrderButton>
      </Spacer>
    </SafeArea>
  );
};
