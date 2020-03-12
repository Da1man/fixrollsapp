import {combineReducers, createStore} from 'redux';
import {catalogReducer} from './catalogReducer';

let rootReducer = combineReducers({
  catalog: catalogReducer,
});

let store = createStore(rootReducer);
export default store;
