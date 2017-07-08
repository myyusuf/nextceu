import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Grid, Row, Col, Pager, Button } from 'react-bootstrap';

import StudentProfile from './StudentProfile';
import CourseList from './course/CourseList';
import CourseDetails from './course/CourseDetails';

const STUDENTS_URL = '/api/students';

class StudentView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      student: {},
    };

    this.onStudentProfileUpdateSuccess = this.onStudentProfileUpdateSuccess.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
  }

  componentDidMount() {
    axios.get(`${STUDENTS_URL}/${this.props.match.params.studentId}`)
    .then((response) => {
      this.setState({
        student: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  onStudentProfileUpdateSuccess(student) {
    const studentInState = this.state.student;
    studentInState.name = student.name;
    studentInState.oldSid = student.oldSid;
    studentInState.newSid = student.newSid;
    this.setState({
      student: studentInState,
    });
  }

  deleteStudent() {

    if (this.state.student.id) {
      const answer = confirm(`Student ${this.state.student.name} will be deleted.\nThis action can not be undone. Continue?.`);
      if (answer) {
        axios.delete(`${STUDENTS_URL}/${this.state.student.id}`)
        .then((response) => {
          window.location.href = '#/students';
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }
  }

  render() {

    const studentProfile = (props) => {
      return (
        <StudentProfile
          student={this.state.student}
          onSaveSuccess={this.onStudentProfileUpdateSuccess}
        />
      );
    }

    const courseList = (props) => {
      return (
        <CourseList
          student={this.state.student}
          onSaveSuccess={this.onStudentProfileUpdateSuccess}
        />
      );
    }

    return (
      <section>
        <div className="container-full">

          <div className="row fh bg-white">
            <div className="col-md-3 fh-md oa pr0 student-profile-menu-container">

              <Row>

                <Col sm={12} className="text-left">
                  <img src="images/user/02.jpg" alt="Contact" className="fw img-responsive" style={{ padding: 20 }} />
                </Col>
              </Row>

              <Row>
                <Col sm={12} className="text-left">
                  <h5 className="" style={{ marginLeft: 20, marginBottom: 10, marginTop: -5 }}>{this.state.student.name}</h5>
                </Col>
              </Row>
              <Row>
                <Col sm={12} className="text-left">
                  <h6
                    className=""
                    style={{ marginLeft: 20, marginBottom: 15, marginTop: 0 }}
                  >
                    {this.state.student.oldSid} {this.state.student.newSid}
                  </h6>
                </Col>
              </Row>

              <div id="markers-list" className="list-group">
                  <a data-panto-marker="0" className="list-group-item" href={`#/students_view/${this.state.student.id}/profile`}>
                      <em className="pull-right ion-ios-arrow-forward"></em>
                      Data Siswa
                  </a>
                  <a data-panto-marker="0" className="list-group-item" href={`#/students_view/${this.state.student.id}/course`}>
                      <em className="pull-right ion-ios-arrow-forward"></em>
                      Bagian Diambil
                      <span className="pull-right nav-label" style={{ marginRight: 20 }}>
                        <span className="badge bg-default"></span>
                      </span>
                      <span className="pull-right nav-label" style={{ marginRight: 5 }}>
                        <span className="badge bg-default"></span>
                      </span>
                  </a>
                  <a data-panto-marker="1" className="list-group-item">
                      <em className="pull-right ion-ios-arrow-forward"></em>
                      Nilai UKMPPD
                  </a>
                  <a data-panto-marker="1" className="list-group-item">
                      <em className="pull-right ion-ios-arrow-forward"></em>
                      Seminar
                  </a>
                  <a data-panto-marker="2" className="list-group-item">
                      <em className="pull-right ion-ios-arrow-forward">
                      </em>Masalah
                      <span className="pull-right nav-label" style={{ marginRight: 20 }}>
                        <span className="badge bg-danger">30</span>
                      </span>
                  </a>
                  <li data-panto-marker="2" className="list-group-item">
                    <Button type="button" bsStyle="danger" className="" block onClick={this.deleteStudent}>
                      Hapus Siswa
                    </Button>
                  </li>

                  <Pager style={{ paddingLeft: 20, paddingTop: 0 }}>
                    <Pager.Item previous href="#/students" style={{ color: '#448AFF' }}>&larr; Student List</Pager.Item>
                  </Pager>
              </div>

            </div>

            <div className="col-md-9 fh-md oa bg-white">
              <Grid fluid style={{ padding: 12, paddingLeft: 0 }}>
                <Row>
                  <Route path="/students_view/:studentId/profile" render={studentProfile} />
                  <Route path="/students_view/:studentId/course" render={courseList} />
                  <Route path="/students_view/:studentId/course_details/:courseId" component={CourseDetails} />

                </Row>
              </Grid>

            </div>

          </div>
        </div>

      </section>
    );
  }
}

export default StudentView;
