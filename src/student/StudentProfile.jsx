import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';

class StudentProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="Data Diri">Tab 1 content</Tab>
        <Tab eventKey={2} title="Alamat">Tab 2 content</Tab>
        <Tab eventKey={3} title="Pendidikan">Tab 3 content</Tab>
      </Tabs>
    );
  }
}

StudentProfile.propTypes = {
};

export default StudentProfile;
