import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Tabs, Tab, SplitButton, MenuItem, Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import CourseAddByLevelWindow from './CourseAddByLevelWindow';

class CourseList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      student: props.student,
      showCourseAddByLevelWindow: false,
      showCourseAddByDepartmentWindow: false,
      courses: [],
    };

    this.addCourseButtonSelect = this.addCourseButtonSelect.bind(this);
    this.onAddCourseSuccess = this.onAddCourseSuccess.bind(this);
  }

  componentDidMount() {
    this.getCourses();
  }

  componentWillReceiveProps(nextProps) {

    console.log('-------------------->');
    this.setState({
      student: nextProps.student,
    }, () => {
      this.getCourses();
    });
  }

  getCourses() {
    axios.get(`/api/students/${this.state.student.id}/courses`)
    .then((response) => {
      const courses = response.data;
      this.setState({
        courses,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  addCourseButtonSelect(eventKey, event) {
    if (eventKey === 'LEVEL') {
      this.setState({
        showCourseAddByLevelWindow: true,
      });
    } else if (eventKey === 'DEPARTMENT') {
      this.setState({
        showCourseAddByDepartmentWindow: true,
      });
    }
  }

  onAddCourseSuccess() {
    this.setState({
      showCourseAddByLevelWindow: false,
      showCourseAddByDepartmentWindow: false,
    }, () => {
      this.getCourses();
    });
  }

  render() {

    const level1Courses = this.state.courses;
    const level1CoursesEl = [];
    for (let i = 0; i < level1Courses.length; i += 1) {
      const course = level1Courses[i];

      level1CoursesEl.push(
        <div className="panel panel-default">
            <div className="panel-heading">
                <div className="panel-title">
                  <div style={{ display: 'flex' }}>
                    <div style={{ width: 25, height: 25, border: '1px solid black', borderRadius: '50%', backgroundColor: course.Department.color }} />
                    <div style={{ marginLeft: 10 }}><a href={`#/students_view/${this.state.student.id}/course_details/${course.id}`}>{course.title}</a></div>
                  </div>
                </div>
            </div>
            <div className="panel-body">
              <div>
                <strong>Bagian : </strong>{course.Department.name}
              </div>
              <div className="text-right">
                <Button bsStyle="danger" bsSize="small" onClick={() => this.confirmDelete(department)}>
                  <i className="fa fa-remove" />
                </Button>
              </div>
            </div>
        </div>
      );
    }

    return (
      <Tabs
        style={{ marginLeft: 20, marginRight: 20, marginTop: 5 }}
        bsStyle="pills"
        defaultActiveKey={1}
        id="uncontrolled-tab-example"
      >
        <Tab eventKey={1} title="Tingkat 1" style={{ marginTop: -10 }}>
          <Row>
            <Col md={6} mdOffset={6}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="text-right">
                <button style={{ marginRight: 10 }}
                  type="button"
                  className="btn btn-labeled btn-default ripple"
                >
                  Chart
                  <span className="btn-label btn-label-right">
                    <i className="ion-stats-bars" />
                  </span>
                </button>
                <SplitButton bsStyle="success" title="+ Bagian" onSelect={this.addCourseButtonSelect}>
                  <MenuItem eventKey="LEVEL">Tingkat</MenuItem>
                  <MenuItem eventKey="DEPARTMENT">Bagian</MenuItem>
                </SplitButton>
              </div>

            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ListGroup style={{ marginTop: 20 }}>
                {level1CoursesEl}
              </ListGroup>

            </Col>
          </Row>

          <CourseAddByLevelWindow
            student={this.state.student}
            showModal={this.state.showCourseAddByLevelWindow}
            onSaveSuccess={this.onAddCourseSuccess}
          />
        </Tab>
        <Tab eventKey={2} title="Tingkat 2">Tab 2 content</Tab>
      </Tabs>
    );
  }
}

CourseList.propTypes = {
};

export default CourseList;
