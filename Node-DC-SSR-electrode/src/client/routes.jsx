import React from 'react';
import { Route, IndexRoute, Link } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Product from './components/Product';
import Random from './components/Random';
import Count from './components/Count';

const FourOhFour = () => (
      <div>
        Page not found. <Link to="/">Home</Link>
      </div>
    );

export const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="product(/:id)" component={Product}/>
    <Route path="random(/:id)" component={Random}/>
    <Route path="count(/:count(/:depth))" component={Count}/>
    <Route path="*" component={FourOhFour}/>
  </Route>
);
