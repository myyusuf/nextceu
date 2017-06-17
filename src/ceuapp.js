import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import Workspace from './Workspace.jsx';
import StudentList from './student/StudentList.jsx';
import StudentView from './student/StudentView.jsx';
import DepartmentList from './department/DepartmentList.jsx';

ReactDOM.render(
  <HashRouter>
    <Workspace>
      <Route path="/students" component={ StudentList } />
      <Route path="/students_details" component={ StudentView } />
      <Route path="/departments" component={ DepartmentList } />
    </Workspace>
  </HashRouter>,
  document.getElementById('app')
);
