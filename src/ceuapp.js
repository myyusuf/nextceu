import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import Workspace from './Workspace';
import StudentList from './student/StudentList';
import StudentView from './student/StudentView';
import Dashboard from './dashboard/Dashboard';

ReactDOM.render(
  <HashRouter>
    <Workspace>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/students" component={StudentList} />
      <Route path="/students_view" component={StudentView} />
    </Workspace>
  </HashRouter>,
  document.getElementById('app')
);
