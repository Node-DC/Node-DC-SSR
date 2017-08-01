process.on('SIGINT', () => {
  process.exit(0);
});

const support = require('electrode-archetype-react-app/support');

support.cssModuleHook({
  generateScopedName: '[name]__[local]___[hash:base64:5]'
});

support.load({
  isomorphicExtendRequire: true
}).then(() => {
  require('./views/direct-mode');
});
