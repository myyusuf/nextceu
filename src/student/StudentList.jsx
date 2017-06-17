import React from 'react';
import axios from 'axios';
import { Row, Col, Thumbnail, Button } from 'react-bootstrap';

class StudentList extends React.Component {
// const StudentList = () => {

  constructor(props) {
    super(props);
    this.state = {
      students: [],
    };
  }

  componentDidMount() {
    axios.get('/students')
    .then((response) => {
      this.setState({
        students: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  viewStudent(student) {
    window.location.href = `#/students_details/${student.id}`;
  }

  render() {
    const studentThumbnails = [];
    const students = this.state.students;

    for (let i = 0; i < students.length; i += 1) {
      const student = students[i];
      studentThumbnails.push(
        <Col xs={6} md={4} key={student.id}>
          <Thumbnail src="" alt="">
            <h3>{ student.name }</h3>
            <p>{student.oldSid} {student.newSid}</p>
            <p>
              <Button
                bsStyle="primary"
                onClick={() => this.viewStudent(student)}
              >
                Details
              </Button>
            </p>
          </Thumbnail>
        </Col>
      );
    }
    return (
      <Row>
        {studentThumbnails}
      </Row>
    );
  }
}

export default StudentList;
