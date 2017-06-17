import React from 'react';
import axios from 'axios';
import { Row, Col, Thumbnail, Button } from 'react-bootstrap';

class StudentList extends React.Component {
// const StudentList = () => {

  constructor() {
    super();
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

  render() {
    const studentThumbnails = [];
    const students = this.state.students;

    for (let i = 0; i < students.length; i += 1) {
      const student = students[i];
      studentThumbnails.push(
        <Col xs={6} md={4} key={student.id}>
          <Thumbnail src="/assets/thumbnaildiv.png" alt="242x200">
            <h3>{ student.name }</h3>
            <p>{student.oldSid} {student.newSid}</p>
            <p>
              <Button bsStyle="primary">Details</Button>&nbsp;
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
