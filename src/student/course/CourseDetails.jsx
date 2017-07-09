import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Tabs, Tab, Row, Col, Button } from 'react-bootstrap';
import CourseInfo from './CourseInfo';
import CourseSchedule from './CourseSchedule';
import CourseScore from './CourseScore';
import CourseSeminar from './CourseSeminar';
import CourseProblem from './CourseProblemList';

const COURSES_URL = '/api/courses';

class CourseDetails extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      course: {},
    };

    this.close = this.close.bind(this);
    this.onSaveInfoSuccess = this.onSaveInfoSuccess.bind(this);

  }

  componentDidMount() {
    this.getCourse();
  }

  onSaveInfoSuccess(updatedCourse) {
    const course = this.state.course;
    course.title = updatedCourse.title;
    this.setState({
      course,
    });
  }

  getCourse() {
    axios.get(`${COURSES_URL}/${this.props.match.params.courseId}`)
    .then((response) => {
      this.setState({
        course: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  close() {
    window.location.href = `#/students_view/${this.props.match.params.studentId}/course`;
  }

  render() {
    const course = this.state.course;
    let department = course.Department;
    if (!course.Department) {
      department = {};
    }
    return (
      <div>
        <Row>
          <Col md={12}>
            <div className="panel panel-default" style={{ margin: 10, marginLeft: 20, marginRight: 20 }}>
              <div className="panel-body">
                <Row>
                  <Col md={10}>
                    <div style={{ display: 'flex' }}>
                      <div style={{ width: 25, height: 25, border: '1px solid black', borderRadius: '50%', backgroundColor: department.color }}></div>
                      <div style={{ marginLeft: 10 }}><strong>{course.title} ( {department.name} )</strong></div>
                    </div>
                  </Col>
                  <Col md={2} className="text-right">
                    <Button bsStyle="primary" onClick={() => this.close(department)}>
                      Close
                    </Button>
                  </Col>
                </Row>

              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
              <Tab eventKey={1} title="Info">
                <CourseInfo course={this.state.course} onSaveSuccess={this.onSaveInfoSuccess} />
              </Tab>
              <Tab eventKey={2} title="Jadwal">
                <CourseSchedule course={this.state.course} />
              </Tab>
              <Tab eventKey={3} title="Nilai">
                <CourseScore course={this.state.course} />
              </Tab>
              <Tab eventKey={4} title="Seminar">
                <CourseSeminar course={this.state.course} />
              </Tab>
              <Tab eventKey={5} title="Masalah">
                <CourseProblem course={this.state.course} />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

CourseDetails.propTypes = {
};

export default CourseDetails;
