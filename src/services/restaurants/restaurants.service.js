import camelize from 'camelize';

import { host, isMock } from '../../utils';

export const restaurantsRequest = (location) => {
  const url = `${host}/placesNearby?location=${location}&mock=${isMock}`;
  return fetch(url).then((res) => res.json());
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === 'CLOSED_TEMPORARILY',
    };
  });
  return camelize(mappedResults);
};
