/**
 * Created by exialym on 2017/6/24.
 */
import * as React from 'react'
import { Router, Route, Link, IndexRoute } from 'react-router'
import App from '../containers/App'
import MainPage from '../containers/MainPage'
import About from '../containers/About'

export default (
  <Route path="/" component={MainPage}>
    <IndexRoute component={App}/>
    <Route path="/about" component={About} />
  </Route>
)