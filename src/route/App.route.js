import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import * as Pages from '../page';

const AppRouting = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/'} component={Pages.Home} exact/>
        <Route path={'/user'} component={Pages.User} exact/>
        <Route path={'/user/:id'} component={Pages.User} exact/>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouting;
