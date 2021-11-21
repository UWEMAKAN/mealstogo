const url = require('url');
const functions = require('firebase-functions');

const { locations: locationsMock } = require('./geocode.mock');

exports.geocodeRequest = (req, res, client) => {
  const { city, mock } = url.parse(req.url, true).query;
  if (mock === 'true') {
    const locationMock = locationsMock[city.toLowerCase()];
    return res.json(locationMock);
  }
  return client
    .geocode({
      params: {
        address: city,
        key: functions.config().google.key,
      },
      timeout: 10000,
    })
    .then((response) => res.json(response.data))
    .catch((e) => res.status(400).send(e.response.data.error_message));
};
