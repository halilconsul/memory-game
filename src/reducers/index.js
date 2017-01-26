import { combineReducers } from 'redux';
import BoardReducer from './BoardReducer.js';

const rootReducer = combineReducers({
   board: BoardReducer
});

export default rootReducer;
