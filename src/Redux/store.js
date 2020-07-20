import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const allEnhancers = compose(
  applyMiddleware(thunk),
);

const store = createStore(reducer, allEnhancers);
export default store;
