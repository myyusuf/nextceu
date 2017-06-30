import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Header from './workspace/Header';
import Sidebar from './workspace/Sidebar';

const Workspace = ({ children }) => {

  return (
    <div className="layout-container">
      <Header />
      <Sidebar />
      <div className="sidebar-layout-obfuscator" />
      <div className="main-container">
        { children }
      </div>
      <footer>
        <span>2017 - CEU app.</span>
      </footer>
    </div>
  );
};

export default Workspace;
