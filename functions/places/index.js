const url = require('url');
const functions = require('firebase-functions');

const { mocks, addMockedImage, mockImages } = require('./mock');

const addGoogleImage = (restaurant) => {
  const ref = restaurant.photos && restaurant?.photos[0]?.photo_reference;
  if (!ref) {
    const imageIndex = Math.ceil(Math.random() * (mockImages.length - 1));
    const photo = mockImages[imageIndex];
    return { ...restaurant, photos: [photo] };
  }
  const photos = [
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${
      functions.config().google.key
    }`,
  ];
  return { ...restaurant, photos };
};

exports.placesRequest = (req, res, client) => {
  const { location, mock } = url.parse(req.url, true).query;
  if (mock === 'true') {
    const data = mocks[location.toLowerCase()];
    if (data) {
      data.results = data.results.map(addMockedImage);
    }
    return res.json(data);
  }
  return client
    .placesNearby({
      params: {
        location,
        radius: 1500,
        type: 'restaurant',
        key: functions.config().google.key,
      },
      timeout: 10000,
    })
    .then((response) => {
      response.data.results = response.data.results.map(addGoogleImage);
      return res.json(response.data);
    })
    .catch((e) => {
      return res.status(400).send(e.response.data.error_message);
    });
};
