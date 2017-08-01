import React from 'react';
import { Route, IndexRoute, Link } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Product from './components/Product';

const FourOhFour = () => (
      <div>
        Page not found. <Link to="/">Home</Link>
      </div>
    );

export const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="product(/:id)" component={Product}/>
    <Route path="*" component={FourOhFour}/>
  </Route>
);
