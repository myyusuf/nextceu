import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Grid, Row, Col, Pager } from 'react-bootstrap';

import StudentProfile from './StudentProfile';

const STUDENTS_URL = '/api/students';

class StudentView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      student: {},
    };

    this.onStudentProfileUpdateSuccess = this.onStudentProfileUpdateSuccess.bind(this);
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

  render() {

    const studentProfile = (props) => {
      return (
        <StudentProfile
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
                  <a data-panto-marker="0" className="list-group-item">
                      <em className="pull-right ion-ios-arrow-forward"></em>
                      Data Siswa
                  </a>
                  <a data-panto-marker="0" className="list-group-item">
                      <em className="pull-right ion-ios-arrow-forward"></em>
                      Bagian Diambil
                      <span className="pull-right nav-label" style={{ marginRight: 20 }}>
                        <span className="badge bg-default">7</span>
                      </span>
                      <span className="pull-right nav-label" style={{ marginRight: 5 }}>
                        <span className="badge bg-default">9</span>
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

                  <Pager style={{ paddingLeft: 20, paddingTop: 20 }}>
                    <Pager.Item previous href="#/students" style={{ color: '#448AFF' }}>&larr; Student List</Pager.Item>
                  </Pager>
              </div>

            </div>

            <div className="col-md-9 fh-md oa bg-white">
              <Grid fluid style={{ padding: 12, paddingLeft: 0 }}>
                <Row>
                  <Route path="/students_view/:studentId/profile" render={studentProfile} />



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
