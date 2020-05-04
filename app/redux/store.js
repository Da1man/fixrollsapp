import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {catalogReducer} from './catalogReducer';
import {checkoutReducer} from './checkoutReducer';
import {profileReducer} from './profileReducer';

let rootReducer = combineReducers({
  catalog: catalogReducer,
  checkout: checkoutReducer,
  profile: profileReducer,
});

let store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
