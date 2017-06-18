import React from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

const LeftMenu = () => {
  return (
    <Panel collapsible defaultExpanded header="Main Menu" bsStyle="primary">
      <ListGroup fill>
        <ListGroupItem>
          <a href="#/dashboard">
            <i className="fa fa-area-chart" style={{ marginRight: 10 }} />
            Dashboard
          </a>
        </ListGroupItem>
        <ListGroupItem>
          <a href="#/students">
            <i className="fa fa-user-o" style={{ marginRight: 10 }} />
            Mahasiswa
          </a>
        </ListGroupItem>
        <ListGroupItem>
          <a href="#/departments">
            <i className="fa fa-th-list" style={{ marginRight: 10 }} />
            Bagian
          </a>
        </ListGroupItem>
      </ListGroup>
    </Panel>
  );
};

export default LeftMenu;
