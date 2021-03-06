import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';


import routes from './store/routes';
import configureStore from './store/configure-store';

import {customTheme} from './styles/custom-theme';
const MuiThemeProvider = require('material-ui/styles').MuiThemeProvider;
var injectTapEventPlugin = require("react-tap-event-plugin");
import './styles/index.css';

const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);

injectTapEventPlugin();
ReactDOM.render(
      
    <div>
  <MuiThemeProvider muiTheme={customTheme} >
    <Provider store={ store }>
        <Router history={ history }>
          { routes }
        </Router>
      </Provider>
     </MuiThemeProvider>
    </div>
      ,
    document.getElementById('content')
  );
