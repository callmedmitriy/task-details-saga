import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import linksListReducer from '../reducers/linksList';
import serviceInfoReducer from '../reducers/serviceInfo';

import createSagaMiddleware from 'redux-saga';
import saga from '../sagas';

const reducer = combineReducers({
  linksList: linksListReducer,
  serviceInfo: serviceInfoReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(saga);

export default store;
