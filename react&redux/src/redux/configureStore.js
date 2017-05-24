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
//包装每个reducer，使其计算每个reducer执行的时间，看看哪个超时了
//这里就是把所有reducer函数读出来，外部又包了一个reducer存回去
function logSlowReducers(reducers, thresholdInMs = 8) {
  Object.keys(reducers).forEach((name) => {
    const originalReducer = reducers[name];
    reducers[name] = (state, action) => {
      const start = Date.now();
      const result = originalReducer(state, action);
      const diffInMs = Date.now() - start;
      if (diffInMs >= thresholdInMs) {
        console.warn(`Reducer ${name} took ${diffInMs} ms for ${action.type}`);
      }
      return result;
    };
  });
  return reducers;
}
const finalCreateStore = compose(
  applyMiddleware(ThunkMiddleware,FetchMiddleware)
)(createStore);
const reducer = combineReducers(logSlowReducers(Object.assign({}, rootReducer, {
  routing: routerReducer,
}),1));
export default function configureStore(initialState) {
  const store = finalCreateStore(reducer, initialState);
  return store;
}