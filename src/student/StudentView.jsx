import React from 'react';
import axios from 'axios';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import StudentInfo from './StudentInfo.jsx';

class StudentView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      student: {},
    };
  }

  render() {
    return (
      <Row>
        <Col xs={24} md={16}>
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Info"><StudentInfo /></Tab>
            <Tab eventKey={2} title="Bagian Diambil">Tab 2 content</Tab>
            <Tab eventKey={3} title="Nilai UKMPD">Tab 3 content</Tab>
            <Tab eventKey={4} title="Masalah">Tab 3 content</Tab>
          </Tabs>
        </Col>
      </Row>
    );
  }
}

export default StudentView;
