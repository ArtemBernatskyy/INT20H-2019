import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound404 from 'containers/404';
import MainPage from 'containers/MainPage';


const Router = () => (
  <main>
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="" component={NotFound404} />
    </Switch>
  </main>
);

export default Router;
