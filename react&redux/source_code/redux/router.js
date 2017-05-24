/**
 * Created by exialym on 2017/5/21.
 */
import { browserHistory } from 'react-router'
import { syncHistoryWithStore,routerMiddleware,push } from 'react-router-redux'
import {createStore,applyMiddleware} from 'redux'

//将你所用的history类型传入routerMiddleware，创建一个Redux中间件
const middleware = routerMiddleware(browserHistory);
//利用这个中间件创建一个store，以便这个store可以处理history有关的action
const store = createStore(reducers,applyMiddleware(middleware));

store.dispatch(push('/home'));

//OR，另一种方法

//利用这个中间件创建一个store，以便这个store可以处理history有关的action
const store = createStore(reducers);
//这个强的histoy传给React Router的<Router>作为props，react就有了观察路由变化的能力
const history = syncHistoryWithStore(browserHistory, store);

