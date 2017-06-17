import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import Workspace from './Workspace.jsx';

ReactDOM.render(
  <HashRouter>
    <Workspace>
    </Workspace>
  </HashRouter>,
  document.getElementById('app')
);
