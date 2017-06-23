import React from 'react';
import axios from 'axios';
import { Row, Col, Panel, Button, ListGroup, ListGroupItem, Badge, ProgressBar, Form, FormGroup, FormControl } from 'react-bootstrap';

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
        <Panel>
          <Row>
            <Col md={1}>
              <i className="fa fa-user-circle" style={{ marginRight: 10, fontSize: 50, color: 'silver' }} />
            </Col>
            <Col md={11}>
              <div style={{ paddingLeft: 20 }}>
                <h4><a onClick={() => this.viewStudent(student)}>{ student.name }</a></h4>
                <p>{student.oldSid} {student.newSid}</p>
                <ProgressBar now={70} bsStyle="success" style={{ height: 10, padding: 0 }} />
                <p>
                  <Button
                    onClick={() => this.viewStudent(student)}
                  >
                    <i className="fa fa-external-link" style={{ fontSize: 20 }} />
                  </Button>
                  <Button style={{ marginLeft: 10 }}>
                    <i className="fa fa-commenting-o" style={{ fontSize: 20 }} />
                  </Button>
                </p>
              </div>
            </Col>
          </Row>
        </Panel>
      );
    }
    return (
      <Row>
        <Col xs={8} md={8}>

          <div className="search-box">
            <form className="search-form">
              <input className="form-control" placeholder="Nama atau Stambuk" type="text" />
              <button className="btn btn-link search-btn">
                <i className="glyphicon glyphicon-search"></i>
              </button>
            </form>
          </div>

          {studentThumbnails}
        </Col>
        <Col xs={4} md={4}>
          <ListGroup fill>
            <ListGroupItem>
              <a href="#/dashboard">
                Aktif
              </a>
              <Badge>200</Badge>
            </ListGroupItem>
            <ListGroupItem>
              <a href="#/students">
                Bermasalah
              </a>
              <Badge>10</Badge>
            </ListGroupItem>
            <ListGroupItem>
              <a href="#/departments">
                Ujian UKMPPD
              </a>
              <Badge>30</Badge>
            </ListGroupItem>
          </ListGroup>
        </Col>

      </Row>
    );
  }
}

export default StudentList;
