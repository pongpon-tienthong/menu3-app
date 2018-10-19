import { combineReducers } from 'redux';

import routes from './routes';

import restaurantReducer from "./restaurantReducer";
import menuReducer from "./menuReducer";

export default combineReducers({
  routes,
  restaurant: restaurantReducer,
  menu: menuReducer
});