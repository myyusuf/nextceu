import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Tabs, Tab, Row, Col, Button } from 'react-bootstrap';
import CourseAddByLevelWindow from './CourseAddByLevelWindow';

const COURSES_URL = '/api/courses';

class CourseDetails extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      course: {},
    };

    this.close = this.close.bind(this);
  }

  componentDidMount() {
    this.getCourse();
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
                      <div style={{ marginLeft: 10 }}><strong>{course.title}</strong></div>
                    </div>
                  </Col>
                  <Col md={2}>
                    <Button bsStyle="primary" style={{ marginLeft: 30 }} onClick={() => this.close(department)}>
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
              <Tab eventKey={1} title="Info">Tab 1 content</Tab>
              <Tab eventKey={2} title="Jadwal">Tab 2 content</Tab>
              <Tab eventKey={3} title="Nilai">Tab 3 content</Tab>
              <Tab eventKey={4} title="Seminar">Tab 4 content</Tab>
              <Tab eventKey={5} title="Masalah">Tab 5 content</Tab>
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