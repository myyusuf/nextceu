import React from 'react';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';


class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <section>
        <div className="content-heading bg-white">
          <Row>
            <Col sm={9}>
              <h4 className="m0 text-thin">Welcome to CEU dashboard</h4>
              <small>Dashboard for admin</small>
            </Col>
            <Col sm={3} className="text-right hidden-xs">
              <button
                type="button"
                className="mt-sm btn btn-labeled btn-default ripple"
              >
                Apps
                <span className="btn-label btn-label-right">
                  <i className="ion-plus-round" />
                </span>
              </button>
            </Col>
          </Row>
        </div>
        <Grid fluid>
          <Row>
              <Col xs={6} lg={3}>
                  <div className="card">
                      <div className="card-body pv">
                          <div className="clearfix">
                              <div className="pull-left">
                                  <h4 className="m0 text-thin">350</h4><small className="m0 text-muted"><em className="mr-sm ion-arrow-up-b"></em>New visitors</small>
                              </div>
                              <div className="pull-right mt-lg">
                                  <div id="sparkline2" data-line-color="#4caf50" className="sparkline"></div>
                              </div>
                          </div>
                      </div>
                  </div>
              </Col>
              <Col xs={6} lg={3}>
                  <div className="card">
                      <div className="card-body pv">
                          <div className="clearfix">
                              <div className="pull-left">
                                  <h4 className="m0 text-thin">10,200</h4><small className="m0 text-muted"><em className="mr-sm ion-arrow-down-b"></em>Page views</small>
                              </div>
                              <div className="pull-right mt-lg">
                                  <div id="sparkline1" data-line-color="#03A9F4" className="sparkline"></div>
                              </div>
                          </div>
                      </div>
                  </div>
              </Col>
              <Col xs={6} lg={3} className="visible-lg">
                  <div className="card">
                      <div className="card-body pv">
                          <div className="clearfix">
                              <div className="pull-left">
                                  <h4 className="m0 text-thin">880</h4><small className="m0 text-muted"><em className="mr-sm ion-arrow-up-b"></em>Last income</small>
                              </div>
                              <div className="pull-right mt-lg">
                                  <div id="sparkline3" data-line-color="#ab47bc" className="sparkline"></div>
                              </div>
                          </div>
                      </div>
                  </div>
              </Col>
              <Col xs={6} lg={3} className="visible-lg">
                  <div className="card">
                      <div className="card-body pv">
                          <div className="clearfix">
                              <div className="pull-left">
                                  <h4 className="m0 text-thin">780</h4><small className="m0 text-muted"><em className="mr-sm ion-arrow-up-b"></em>Reservations</small>
                              </div>
                              <div className="pull-right mt-lg">
                                  <div id="sparkline4" data-line-color="#e91e63" className="sparkline"></div>
                              </div>
                          </div>
                      </div>
                  </div>
              </Col>
          </Row>
        </Grid>
      </section>
    );
  }
}

export default Dashboard;
