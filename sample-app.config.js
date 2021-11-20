// Be sure to rename this file from sample-app.config.js to app.config.js

export default ({ config }) => {
  const extra = {
    AUTH_KEY: 'Your Firebase Auth API Key goes here',
  };
  return {
    ...config,
    extra,
  };
};
