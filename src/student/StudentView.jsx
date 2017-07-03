import React from 'react';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';


class StudentView extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <section>
        <div className="container-full">

          <div className="row fh bg-white">
            <div className="col-md-3 fh-md oa pr0">

              <Row>

                <Col sm={12} className="text-left">
                  <img src="images/user/02.jpg" alt="Contact" className="fw img-responsive" style={{ padding: 20 }} />
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
              </div>

            </div>

            <div className="col-md-9 fh-md oa text-center bg-gray-lighter">
              <Grid fluid style={{ padding: 12, paddingLeft: 0 }}>
                <Row>




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
