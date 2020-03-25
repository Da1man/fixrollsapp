import {combineReducers, createStore} from 'redux';
import {catalogReducer} from './catalogReducer';
import {checkoutReducer} from './checkoutReducer';

let rootReducer = combineReducers({
  catalog: catalogReducer,
  checkout: checkoutReducer,
});

let store = createStore(rootReducer);
export default store;
