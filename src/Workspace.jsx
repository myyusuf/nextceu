import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import NavigationBar from './workspace/NavigationBar.jsx';
import LeftMenu from './workspace/LeftMenu.jsx';

const Workspace = ({ children }) => {

  return (
    <div>
      <NavigationBar />
      <Grid>
        <Row className="show-grid">
          <Col sm={6} md={3}><LeftMenu /></Col>
          <Col sm={18} md={9}>{ children }</Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Workspace;
