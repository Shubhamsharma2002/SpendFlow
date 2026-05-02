// app.config.js — extends app.json with runtime env vars for PostHog
const appJson = require('./app.json');

module.exports = {
  ...appJson.expo,
  extra: {
    posthogProjectToken: process.env.POSTHOG_PROJECT_TOKEN,
    posthogHost: process.env.POSTHOG_HOST,
  },
};
