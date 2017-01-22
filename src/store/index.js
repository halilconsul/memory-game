import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/index.js';

const middleware = applyMiddleware(logger(), thunk);

export default createStore(rootReducer, middleware);
