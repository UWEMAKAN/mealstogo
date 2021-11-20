import Constants from 'expo-constants';

const localHost = 'https://mealstogo.loca.lt/mealstogo-2fc9c/us-central1';
const liveHost = 'https://us-central1-mealstogo-2fc9c.cloudfunctions.net';

export const isDevelopment = process.env.NODE_ENV === 'development';
export const host = isDevelopment ? localHost : liveHost;

export const { AUTH_KEY } = Constants.manifest.extra;
