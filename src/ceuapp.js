import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import Workspace from './Workspace.jsx';
import StudentList from './student/StudentList.jsx';
import StudentView from './student/StudentView.jsx';
import StudentAdd from './student/StudentAdd.jsx';
import DepartmentList from './department/DepartmentList.jsx';
import DepartmentEdit from './department/DepartmentEdit.jsx';

ReactDOM.render(
  <HashRouter>
    <Workspace>
      <Route path="/students" component={StudentList} />
      <Route path="/students_details/:studentId" component={StudentView} />
      <Route path="/students_add" component={StudentAdd} />
      <Route path="/departments" component={DepartmentList} />
      <Route path="/departments_edit/:departmentId" component={DepartmentEdit} />
      <Route path="/departments_add" component={DepartmentEdit} />
    </Workspace>
  </HashRouter>,
  document.getElementById('app')
);
