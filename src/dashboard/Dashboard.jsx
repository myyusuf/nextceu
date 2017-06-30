import React from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';


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
      </section>
    );
  }
}

export default Dashboard;
