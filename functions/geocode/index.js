const url = require('url');

const { locations: locationsMock } = require('./geocode.mock');

exports.geocodeRequest = (req, res) => {
  const { city } = url.parse(req.url, true).query;
  const locationMock = locationsMock[city.toLowerCase()];
  res.json(locationMock);
};
