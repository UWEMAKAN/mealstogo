import camelize from 'camelize';

import { locations } from './location.mock';

export const locationRequest = (searchTerm) => {
  return new Promise((resolve, reject) => {
    const location = locations[searchTerm];
    if (!location) {
      reject(Error('not found'));
    }
    resolve(location);
  });
};

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { location, viewport } = geometry;
  const { lat, lng } = location;
  return { lat, lng, viewport };
};
