import camelize from 'camelize';

export const locationRequest = (searchTerm) => {
  return fetch(
    `https://mealstogo.loca.lt/mealstogo-2fc9c/us-central1/geoCode?city=${searchTerm}`,
  ).then((res) => res.json());
};

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { location, viewport } = geometry;
  const { lat, lng } = location;
  return { lat, lng, viewport };
};
