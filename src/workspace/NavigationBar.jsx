import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <i className="fa fa-dot-circle-o" style={{ marginRight: 2, fontSize: 20, color: '#0079D1' }} />
          <span style={{ fontWeight: 'bold', color: '#0079D1' }}>CEU</span>
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Form pullLeft>
        <FormGroup>
          <FormControl type="text" placeholder="Find in App..." />
        </FormGroup>
        {' '}
        <Button type="submit">Search</Button>
      </Navbar.Form>
      <Nav>
        <NavItem eventKey={1} href="#"><span style={{ fontWeight: 'bold' }}>Dashboard</span></NavItem>
      </Nav>
      <Nav pullRight>
        <NavDropdown eventKey={3} title="Yusuf" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>My Profile</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.4}>Logout</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
