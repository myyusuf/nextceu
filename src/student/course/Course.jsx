import React from 'react';
import axios from 'axios';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

class Course extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      studentId: props.match.params.studentId,
      courses: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/students/${this.state.studentId}/courses`)
    .then((response) => {
      this.setState({
        courses: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
  }

  render() {
    const level1Courses = this.state.courses;
    const level1CoursesEl = [];
    for (let i = 0; i < level1Courses.length; i += 1) {
      const course = level1Courses[i];
      level1CoursesEl.push(
        <ListGroupItem header="Radiologi" href="#">{course.title}</ListGroupItem>
      );
    }
    return (
      <Row>
        <Col md={12}>
          <ListGroup>
            <ListGroupItem header="Tingkat 1" bsStyle="info"></ListGroupItem>
            {level1CoursesEl}
            <ListGroupItem header="Tingkat 2" bsStyle="info"></ListGroupItem>
            <ListGroupItem header="Neurologi" href="#">Neurologi (1)</ListGroupItem>
            <ListGroupItem header="Anestesi" href="#">Anestesi (1)</ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

export default Course;
