import Constants from 'expo-constants';

const { FIREBASE_AUTH_KEY, STRIPE_KEY_TEST, STRIPE_KEY_LIVE } =
  Constants.manifest.extra;

const localHost = 'https://mealstogo.loca.lt/mealstogo-2fc9c/us-central1';
const liveHost = 'https://us-central1-mealstogo-2fc9c.cloudfunctions.net';

export const isDevelopment = process.env.NODE_ENV === 'development';
export const host = isDevelopment ? localHost : liveHost;
export const isMock = true;
export const AUTH_KEY = FIREBASE_AUTH_KEY;
export const STRIPE_KEY = isDevelopment ? STRIPE_KEY_TEST : STRIPE_KEY_LIVE;
