import React from 'react';
import CourseForm from './CourseForm';
import axios from 'axios';

const STUDENTS_URL = '/api/students';

class CourseEditPage extends React.Component {

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
      <CourseForm
        student={this.state.student}
        onSaveSuccess={this.close}
        onCancel={this.close}
        formType={CourseForm.EDIT_FORM}
      />
    );
  }
}

export default CourseEditPage;
