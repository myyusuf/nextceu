import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Row, Col, Tabs, Tab, Panel, ListGroup, ListGroupItem, Badge, Grid } from 'react-bootstrap';
import StudentInfo from './StudentInfo.jsx';
import Course from './Course.jsx';

class StudentView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      student: {},
    };
  }

  render() {
    return (
      <Row>
        <Col xs={12} md={12}>
          <Row>
            <Col xs={12} md={12}>
              <Panel>
                <Row>
                  <Col md={1}>
                    <i className="fa fa-user-circle student-avatar" />
                  </Col>
                  <Col md={11}>
                    <h4 style={{ marginLeft: 10 }}>Student Name</h4>
                    <h6 style={{ marginLeft: 10 }}>Stambuk</h6>
                  </Col>
                </Row>
              </Panel>
            </Col>
          </Row>

          <Row>
            <Col md={8}>
              <Route path="/students_details/:studentId/profile" component={StudentInfo} />
              <Route path="/students_details/:studentId/courses" component={Course} />
            </Col>
            <Col md={4}>
              <ListGroup fill>
                <ListGroupItem href="#/students_details/1/profile">
                  Profile
                </ListGroupItem>
                <ListGroupItem href="#/students_details/1/courses">
                  Bagian Diambil
                </ListGroupItem>
                <ListGroupItem>
                  <a href="#/departments">
                    Nilai UKMPPD
                  </a>
                </ListGroupItem>
                <ListGroupItem>
                  <a href="#/departments">
                    Masalah
                  </a>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default StudentView;
