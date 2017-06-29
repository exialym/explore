/**
 * Created by exialym on 2017/6/24.
 */
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory, hashHistory, Router } from 'react-router'
import routes from '../../routes/index'
import configureStore from '../../store/configureStore'
import '../../static/css/index.css'
import { Layout, Header , Sidebar, Section, Footer } from 'fit-layout-global'
import Nav from "../../components/Nav";

console.log("PRELOADED_STATE",window.__PRELOADED_STATE__)
const store = configureStore(window.__PRELOADED_STATE__)
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
)