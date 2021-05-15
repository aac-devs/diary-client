import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root.reducer';

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reduxStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export default reduxStore;
