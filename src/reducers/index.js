import { combineReducers } from 'redux';
import ItemsReducer from './ItemsReducer.js';

const rootReducer = combineReducers({
   items: ItemsReducer
});

export default rootReducer;
