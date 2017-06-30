import React from 'react';
import CourseForm from './CourseForm';
import axios from 'axios';

const COURSES_URL = '/api/courses';

class CourseEditPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      course: {},
    };
  }

  componentDidMount() {
    axios.get(`${COURSES_URL}/${this.props.match.params.courseId}`)
    .then((response) => {
      const course = response.data;
      course.department = course.Department;
      this.setState({
        course,
        color: response.data.color ? response.data.color : '',
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  close() {
    window.location.href = '#/courses';
  }

  render() {
    return (
      <CourseForm
        course={this.state.course}
        onSaveSuccess={this.close}
        onCancel={this.close}
        formType={CourseForm.EDIT_FORM}
      />
    );
  }
}

export default CourseEditPage;
