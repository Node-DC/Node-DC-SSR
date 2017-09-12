process.on('SIGINT', () => {
  process.exit(0);
});

const support = require('electrode-archetype-react-app/support');

support.cssModuleHook({
  generateScopedName: '[name]__[local]___[hash:base64:5]'
});

const {runMe} = require('./views/direct-mode');

support.load({
  isomorphicExtendRequire: true
}).then(() => {
    runMe();
}).catch(ex => {
  console.log(ex);
});
