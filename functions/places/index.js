const url = require('url');

const { mocks, addMockedImage } = require('./mock');

exports.placesRequest = (req, res) => {
  const { location } = url.parse(req.url, true).query;
  const data = mocks[location.toLowerCase()];
  if (data) {
    data.results = data.results.map(addMockedImage);
  }
  res.json(data);
};
