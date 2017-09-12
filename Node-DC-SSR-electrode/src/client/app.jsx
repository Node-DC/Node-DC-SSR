//
// This is the client side entry point for the React app.
//

import React from 'react';
import { render } from 'react-dom';
import { routes } from './routes';
import { Router, browserHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

window.webappStart = () => {
  const initialState = window.__PRELOADED_STATE__;
  const store = createStore(rootReducer, initialState);
  render(
    <Provider store={store}>
      <Router history={browserHistory}>{routes}</Router>
    </Provider>,
    document.querySelector('.js-content')
  );
};
