/**
 * Created by exialym on 2017/5/22 0022.
 */
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import ThunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import createFetchMiddleware from 'redux-composable-fetch';
const FetchMiddleware = createFetchMiddleware({
  afterFetch({ action, result }) {
    return result.json().then(data => {
      return Promise.resolve({
        action,
        result: data,
      });
    });
  },
});
const finalCreateStore = compose(
  applyMiddleware(ThunkMiddleware,FetchMiddleware)
)(createStore);
const reducer = combineReducers(Object.assign({}, rootReducer, {
  routing: routerReducer,
}));
export default function configureStore(initialState) {
  const store = finalCreateStore(reducer, initialState);
  return store;
}