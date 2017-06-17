import React from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

const LeftMenu = () => {
  return (
    <Panel collapsible defaultExpanded header="Main Menu" bsStyle="primary">
      <ListGroup fill>
        <ListGroupItem>Dashboard</ListGroupItem>
        <ListGroupItem>Student</ListGroupItem>
      </ListGroup>
    </Panel>
  );
};

export default LeftMenu;
