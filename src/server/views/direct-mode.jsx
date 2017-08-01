
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { routes } from '../../client/routes';
import rootReducer from '../../client/reducers';
import {generateProduct} from '../data/generator';

const initialState = {
  product: generateProduct(0),
};
const store = createStore(rootReducer, initialState);

match({ routes, location: '/product/0' }, (error, redirectLocation, renderProps) => {
    if (error) {
      // 500
    } else if (redirectLocation) {
      // 302
    } else if (renderProps) {
      injectTapEventPlugin();
      global.navigator = global.navigator || {};
      global.navigator.userAgent = 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36';

      console.time('renderToString');

      for(let ii = 0; ii < 1000; ++ii) {
        renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>);
      }

      console.timeEnd('renderToString');

    } else {
      //404
    }
  })
