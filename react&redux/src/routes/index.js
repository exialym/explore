/**
 * Created by exialym on 2017/5/22 0022.
 */
import React from 'react';
import { Router, Route, BrowserRouter } from 'react-router-dom';

import Frames from '../layouts/Frame';
import Home from '../views/Home';
import Detail from '../views/Detail';
import ArticleCRUD from '../views/Search'
import ReactTest  from '../views/ReactTest'
import Visualization  from '../views/Visualization'

const routes = (
  <BrowserRouter>
    <Frames>
      <Route exact path="/" component={Home} />
      <Route path="/detail/:id" component={Detail} />
      <Route path="/search" component={ArticleCRUD} />
      <Route path="/test" component={ReactTest} />
      <Route path="/visualization" component={Visualization} />
    </Frames>

  </BrowserRouter>
);
export default routes;