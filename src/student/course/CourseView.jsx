import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Row, Col, Tabs, Tab, Panel, ListGroup, ListGroupItem, Badge, Grid } from 'react-bootstrap';
import CourseEditPage from './CourseEditPage.jsx';

class CourseView extends React.Component {

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
              <Route path="/course_details/:courseId/main" component={CourseEditPage} />
            </Col>
            <Col md={4}>
              <ListGroup fill>
                <ListGroupItem href={`#/course_details/${this.props.match.params.courseId}/main`}>
                  Info
                </ListGroupItem>
                <ListGroupItem href={`#/course_details/${this.props.match.params.courseId}/schedule`}>
                  Jadwal
                </ListGroupItem>
                <ListGroupItem>
                  Nilai
                </ListGroupItem>
                <ListGroupItem>
                  Masalah
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default CourseView;