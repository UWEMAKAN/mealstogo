const functions = require('firebase-functions');
const { Client } = require('@googlemaps/google-maps-services-js');
const stripeClient = require('stripe')(functions.config().stripe.key);

const { geocodeRequest } = require('./geocode');
const { placesRequest } = require('./places');
const { paymentRequest } = require('./payment');

const googleClient = new Client({});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.geoCode = functions.https.onRequest((request, response) => {
  geocodeRequest(request, response, googleClient);
});

exports.placesNearby = functions.https.onRequest((request, response) => {
  placesRequest(request, response, googleClient);
});

exports.pay = functions.https.onRequest((request, response) => {
  paymentRequest(request, response, stripeClient);
});
