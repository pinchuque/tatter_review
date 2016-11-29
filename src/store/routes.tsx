import * as React from 'react';
const { IndexRoute, Route } = require('react-router');

import AddProject from '../containers/add-project';


export default (
  <Route path="/" component={ AddProject }>
  </Route>
);