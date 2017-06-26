import React from 'react';
import StudentForm from './StudentForm.jsx';

const STUDENTS_URL = '/api/students';

class StudentAddPage extends React.Component {

  close() {
    window.location.href = '#/students';
  }

  render() {
    const student = {};
    return (
      <StudentForm
        student={student}
        onSaveSuccess={this.close}
        onCancel={this.close}
        showCancel
        formType={StudentForm.ADD_FORM}
      />
    );
  }
}

export default StudentAddPage;
