import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../redux/reducers';
import { createLogger } from 'redux-logger';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';


const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

const client = axios.create({
  baseURL: 'http://menu3.us-east-1.elasticbeanstalk.com:8080/api',
  responseType: 'json'
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export default configureStore = () => {

  const store = createStore(reducers, composeEnhancers(
    applyMiddleware(
      loggerMiddleware,
      axiosMiddleware(client)
    )
  ));

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../redux/reducers').default
      store.replaceReducer(nextRootReducer)
    })
  };

  return store;
}