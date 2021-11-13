import camelize from 'camelize';

import { mocks, mockImages } from './mock';

export const restaurantsRequest = (location) => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location];
    if (!mock) {
      reject(Error('not fount'));
    }
    resolve(mock);
  });
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((res) => {
    const imageIndex = Math.ceil(Math.random() * (mockImages.length - 1));
    const photos = res.photos.map(() => {
      return mockImages[imageIndex];
    });
    const restaurant = { ...res, photos };
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === 'CLOSED_TEMPORARILY',
    };
  });
  return camelize(mappedResults);
};
