import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Tabs, Tab, SplitButton, MenuItem, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
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
        <div className="panel panel-default" >
            <div className="panel-heading">
                <div className="panel-title">{course.title}</div>
            </div>
            <div className="panel-body">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.</p>
            </div>
            <div className="panel-footer">Panel Footer</div>
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
        <Tab eventKey={1} title="Tingkat 1">
          <Row>
            <Col md={3} mdOffset={9}>
              <SplitButton bsStyle="success" title="+ Bagian" onSelect={this.addCourseButtonSelect}>
                <MenuItem eventKey="LEVEL">Tingkat</MenuItem>
                <MenuItem eventKey="DEPARTMENT">Bagian</MenuItem>
              </SplitButton>
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
