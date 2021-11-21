// Be sure to rename this file from sample-app.config.js to app.config.js

export default ({ config }) => {
  const extra = {
    FIREBASE_AUTH_KEY: 'Firebase Auth Key',
    STRIPE_KEY_TEST: 'Stripe Publishable Test Key',
    STRIPE_KEY_LIVE: 'Stripe Publishable Live Key',
  };
  return {
    ...config,
    extra,
  };
};
