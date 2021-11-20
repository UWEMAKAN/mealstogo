import camelize from 'camelize';

import { host } from '../../utils';

export const locationRequest = (searchTerm) => {
  const url = `${host}/geoCode?city=${searchTerm}`;
  return fetch(url).then((res) => res.json());
};

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { location, viewport } = geometry;
  const { lat, lng } = location;
  return { lat, lng, viewport };
};
