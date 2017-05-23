/**
 * Created by exialym on 2017/5/22 0022.
 */
import React from 'react';
import { Router, Route, BrowserRouter } from 'react-router-dom';

import Frames from '../layouts/Frame';
import Home from '../views/Home';
import Detail from '../views/Detail';
import ArticleCRUD from '../views/Search'

const routes = (
  <BrowserRouter>
    <Frames>
      <Route exact path="/" component={Home} />
      <Route path="/detail/:id" component={Detail} />
      <Route path="/search" component={ArticleCRUD} />
    </Frames>

  </BrowserRouter>
);
export default routes;