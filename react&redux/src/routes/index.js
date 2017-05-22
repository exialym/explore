/**
 * Created by exialym on 2017/5/22 0022.
 */
import React from 'react';
import { Router, Route, HashRouter, IndexRoute } from 'react-router-dom';

import Frames from '../layouts/Frame';
import Home from '../views/Home';
import Detail from '../views/Detail';

const routes = (
  <HashRouter>
    <Frames>
      <Route exact path="/" component={Home} />
      <Route path="/detail/:id" component={Detail} />
    </Frames>

  </HashRouter>
);
export default routes;