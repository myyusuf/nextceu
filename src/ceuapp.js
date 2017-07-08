import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import Workspace from './Workspace';
import DepartmentList from './department/DepartmentList';
import DepartmentEdit from './department/DepartmentEdit';
import StudentList from './student/StudentList';
import StudentView from './student/StudentView';
import Dashboard from './dashboard/Dashboard';

ReactDOM.render(
  <HashRouter>
    <Workspace>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/departments" component={DepartmentList} />
      <Route path="/departments_add" component={DepartmentEdit} />
      <Route path="/departments_edit/:departmentId" component={DepartmentEdit} />
      <Route path="/students" component={StudentList} />
      <Route path="/students_view/:studentId" component={StudentView} />
    </Workspace>
  </HashRouter>,
  document.getElementById('app')
);
