import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import Workspace from './Workspace.jsx';
import StudentList from './student/StudentList.jsx';

ReactDOM.render(
  <HashRouter>
    <Workspace>
      <Route path="/students" component={ StudentList } />
    </Workspace>
  </HashRouter>,
  document.getElementById('app')
);
