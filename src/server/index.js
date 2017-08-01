
process.on('SIGINT', () => {
  process.exit(0);
});

const electrodeConfippet = require('electrode-confippet');
const support = require('electrode-archetype-react-app/support');

support.cssModuleHook({
  generateScopedName: '[name]__[local]___[hash:base64:5]'
});

/* eslint-disable global-require */
const staticPathsDecor = require('electrode-static-paths');
const startServer = config => require('electrode-server')(config, [staticPathsDecor()]);
//

support.load({
  isomorphicExtendRequire: true
}).then(() => {
  const config = electrodeConfippet.config;
  return startServer(config);
});
