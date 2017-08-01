
import {combineReducers} from 'redux';
import {
  SET_CATEGORIES,
  SET_PRODUCT
} from '../actions';

function categories(store = ['Category 1', 'Category 2'], action) {
  if (action.type == SET_CATEGORIES) {
    return action.data;
  }
  return store;
}

function product(store, action) {
  if (action.type == SET_PRODUCT) {
    return action.data;
  }
  return store || {};
}

export default combineReducers({
  categories,
  product
});
