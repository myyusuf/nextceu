import React from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

const LeftMenu = () => {
  return (
    <Panel collapsible defaultExpanded header="Main Menu" bsStyle="primary">
      <ListGroup fill>
        <ListGroupItem href="#/dashboard">
          <i className="fa fa-area-chart" style={{ marginRight: 10 }} />
          Dashboard
        </ListGroupItem>
        <ListGroupItem href="#/students">
          <i className="fa fa-user-o" style={{ marginRight: 10 }} />
          Mahasiswa
        </ListGroupItem>
        <ListGroupItem href="#/departments">
          <i className="fa fa-th-list" style={{ marginRight: 10 }} />
          Bagian
        </ListGroupItem>
      </ListGroup>
    </Panel>
  );
};

export default LeftMenu;
