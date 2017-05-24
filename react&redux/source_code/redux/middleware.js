/**
 * Created by exialym on 2017/5/21.
 */
import {createStore} from 'redux'
function compose(...funcs) {
  return arg => funcs.reduceRight((composed, f) => f(composed), arg);
}
function applyMiddleware(...middlewares) {
  return (next) => (reducer, initialState) => {
    let store = next(reducer, initialState);
    let dispatch = store.dispatch;
    let chain = [];
    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action),
    };
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);
    return {
      ...store,
      dispatch,
    };
  }
}
//处理promise类型的action
function promiseMiddleware({ dispatch }) {
  return next => action => {
  if (!isFSA(action)) {
    return isPromise(action)
      ? action.then(dispatch)
      : next(action);
  }
  return isPromise(action.payload)
    ? action.payload.then(
      result => dispatch({
        ...action,
        payload: result
      }),
      error => {
        dispatch({
          ...action,
          payload: error,
          error: true
        });
        return Promise.reject(error);
      })
    : next(action);
  };
}


let newStore = applyMiddleware(promiseMiddleware, mid2, mid3)(createStore)(reducer, null);

//一个一步完成异步请求的middleware
//action长这样
let action = {
  url: '/api/weather.json',
  params: {
    city: encodeURI(city),
  },
  types: ['GET_WEATHER', 'GET_WEATHER_SUCESS', 'GET_WEATHER_ERROR'],
};
const fetchMiddleware = store => next => action => {
  if (!action.url || !Array.isArray(action.types)) {
    return next(action);
  }
  const [LOADING, SUCCESS, ERROR] = action.types;
  next({
    type: LOADING,
    loading: true,
    ...action,
  });
  fetch(action.url, { params: action.params })
    .then(result => {
      next({
        type: SUCCESS,
        loading: false,
        payload: result,
      });
    })
    .catch(err => {
      next({
        type: ERROR,
        loading: false,
        error: err,
      });
    });
};

//多异步串联的middleware
//这里的action接受一个数组，这个数组里的每一个步骤都会按顺序执行，异步或同步
const sequenceMiddleware = ({dispatch, getState}) => next => action => {
  if (!Array.isArray(action)) {
    return next(action);
  }
  return action.reduce( (result, currAction) => {
    return result.then(() => {
      return Array.isArray(currAction) ?
        Promise.all(currAction.map(item => dispatch(item))) :
        dispatch(currAction);
    });
  }, Promise.resolve());
};