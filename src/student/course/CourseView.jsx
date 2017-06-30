import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Row, Col, Tabs, Tab, Panel, ListGroup, ListGroupItem, Badge, Grid } from 'react-bootstrap';
import CourseForm from './CourseForm';
import CourseScheduleForm from './CourseScheduleForm';
import CourseHospital1ScheduleForm from './CourseHospital1ScheduleForm';

const COURSES_URL = '/api/courses';

class CourseView extends React.Component {

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
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {

    const courseForm = (props) => {
      return (<CourseForm
        course={this.state.course}
        onSaveSuccess={this.close}
        onCancel={this.close}
        formType={CourseForm.EDIT_FORM}
      />);
    };

    // const courseScheduleForm = (props) => {
    //   return (<CourseScheduleForm
    //     course={this.state.course}
    //     onSaveSuccess={this.close}
    //     onCancel={this.close}
    //     formType={CourseForm.EDIT_FORM}
    //   />);
    // };

    const courseScheduleForm = (props) => {
      return (
        <Row>
          <Col md={12}>
            <CourseScheduleForm
              course={this.state.course}
              onSaveSuccess={this.close}
              onCancel={this.close}
              formType={CourseForm.EDIT_FORM}
            />
          </Col>
          <Col md={12}>
            <CourseHospital1ScheduleForm
              course={this.state.course}
              onSaveSuccess={this.close}
              onCancel={this.close}
              formType={CourseForm.EDIT_FORM}
            />
          </Col>
        </Row>
      );
    };

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
              <Route path="/course_details/:courseId/main" render={courseForm} />
              <Route path="/course_details/:courseId/schedule" render={courseScheduleForm} />
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
