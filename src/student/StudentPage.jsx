import React from 'react';
import axios from 'axios';
import { Row, Col, Panel, Button, ListGroup, ListGroupItem, Badge, ProgressBar, Form, FormGroup, FormControl } from 'react-bootstrap';

const STUDENTS_URL = '/api/students';

class StudentPage extends React.Component {
// const StudentPage = () => {

  constructor(props) {
    super(props);
    this.state = {
      students: [],
    };
  }

  componentDidMount() {
    axios.get(STUDENTS_URL)
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
    window.location.href = `#/students_details/${student.id}/profile`;
  }

  addStudent(student) {
    window.location.href = '#/students_add';
  }

  render() {
    const studentThumbnails = [];
    const students = this.state.students;

    for (let i = 0; i < students.length; i += 1) {
      const student = students[i];
      let studentLevel = '';
      switch (student.level) {
        case 1:
          studentLevel = 'Tingkat 1';
          break;
        case 2:
          studentLevel = 'Tingkat 2';
          break;
        default:
          studentLevel = '0';
          break;
      }
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
                <p>{studentLevel}</p>
                <ProgressBar now={70} style={{ height: 10, padding: 0 }} />
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
      <section>
        <div className="container-full">
          <div className="content-heading bg-white">
            <Row>
              <Col sm={5}>
                <div className="input-group" style={{ padding: 10 }}>
                            <input type="text" className="form-control" placeholder="Stambuk atau Nama"/><span className="input-group-btn">
                              <button type="button" className="btn btn-default">Search</button></span>
                          </div>
              </Col>
              <Col sm={7} className="text-right hidden-xs">
                <button
                  type="button"
                  className="mt-sm btn btn-labeled btn-success ripple"
                >
                  Mahasiswa
                  <span className="btn-label btn-label-right">
                    <i className="ion-plus-round" />
                  </span>
                </button>
              </Col>
            </Row>
          </div>
          <div className="row fh bg-white">
            <div className="col-md-3 fh-md oa pr0">



              <div id="markers-list" className="list-group">
                  <a data-panto-marker="0" className="list-group-item">
                      <em className="pull-right ion-ios-arrow-forward"></em>
                      Aktif
                      <span className="pull-right nav-label" style={{ marginRight: 20 }}>
                        <span className="badge bg-success">350</span>
                      </span>
                  </a>
                  <a data-panto-marker="1" className="list-group-item">
                      <em className="pull-right ion-ios-arrow-forward"></em>
                      Ujian UKMPPD
                      <span className="pull-right nav-label" style={{ marginRight: 20 }}>
                        <span className="badge bg-primary">30</span>
                      </span>
                  </a>
                  <a data-panto-marker="2" className="list-group-item">
                      <em className="pull-right ion-ios-arrow-forward">
                      </em>Bermasalah
                      <span className="pull-right nav-label" style={{ marginRight: 20 }}>
                        <span className="badge bg-danger">30</span>
                      </span>
                  </a>
              </div>
            </div>
            <div className="col-md-9 fh-md oa text-center bg-gray-lighter">
              <h2>Content</h2>
              <p className="lead">Content with auto scrolling</p><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
              <p className="lead">Bottom</p>
            </div>

          </div>
        </div>
      </section>
    );
  }
}

export default StudentPage;
