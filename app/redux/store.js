import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {catalogReducer} from './catalogReducer';
import {checkoutReducer} from './checkoutReducer';

let rootReducer = combineReducers({
  catalog: catalogReducer,
  checkout: checkoutReducer,
});

let store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
