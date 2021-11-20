const functions = require('firebase-functions');
const { Client } = require('@googlemaps/google-maps-services-js');

const { geocodeRequest } = require('./geocode');
const { placesRequest } = require('./places');

const client = new Client({});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.geoCode = functions.https.onRequest((request, response) => {
  geocodeRequest(request, response, client);
});

exports.placesNearby = functions.https.onRequest((request, response) => {
  placesRequest(request, response, client);
});
