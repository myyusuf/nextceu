import React from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

const LeftMenu = () => {
  return (
    <Panel collapsible defaultExpanded header="Main Menu" bsStyle="primary">
      <ListGroup fill>
        <ListGroupItem><a href="#/dashboard">Dashboard</a></ListGroupItem>
        <ListGroupItem><a href="#/students">Mahasiswa</a></ListGroupItem>
        <ListGroupItem><a href="#/departments">Bagian</a></ListGroupItem>
      </ListGroup>
    </Panel>
  );
};

export default LeftMenu;
