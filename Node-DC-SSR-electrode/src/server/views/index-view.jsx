//
// This is the server side entry point for the React app.
//

import ReduxRouterEngine from 'electrode-redux-router-engine';
import {routes} from '../../client/routes';
import {createStore} from 'redux';
import rootReducer from '../../client/reducers';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import {generateProduct} from '../data/generator';
import {config} from 'electrode-confippet';

const Promise = require('bluebird');

function createReduxStore(req, match) { // eslint-disable-line
  const initialState = {
    product:
      generateProduct(
          match.renderProps.params.id || 0,
          config.app.server.generator
          )
  };

  const store = createStore(rootReducer, initialState);
  return Promise.resolve(store);
}

//
// This function is exported as the content for the webapp plugin.
//
// See config/default.json under plugins.webapp on specifying the content.
//
// When the Web server hits the routes handler installed by the webapp plugin, it
// will call this function to retrieve the content for SSR if it's enabled.
//
//

module.exports = (req) => {

  global.navigator = global.navigator || {};
  global.navigator.userAgent = req.headers['user-agent'] || 'all';

  const app = req.server && req.server.app || req.app;
  if (!app.routesEngine) {
    // injectTapEventPlugin();
    app.routesEngine = new ReduxRouterEngine({routes, createReduxStore});
  }

  return app.routesEngine.render(req);
};
