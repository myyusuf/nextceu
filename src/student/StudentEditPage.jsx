import React from 'react';
import StudentForm from './StudentForm.jsx';
import axios from 'axios';

const STUDENTS_URL = '/api/students';

class StudentEditPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      student: {},
    };
  }

  componentDidMount() {
    axios.get(`${STUDENTS_URL}/${this.props.match.params.studentId}`)
    .then((response) => {
      this.setState({
        student: response.data,
        color: response.data.color ? response.data.color : '',
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  close() {
    window.location.href = '#/students';
  }

  render() {
    return (
      <StudentForm
        student={this.state.student}
        onSaveSuccess={this.close}
        onCancel={this.close}
        formType={StudentForm.EDIT_FORM}
      />
    );
  }
}

export default StudentEditPage;
