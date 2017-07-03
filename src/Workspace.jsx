import React from 'react';
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
        <footer>
          <span>2017 - CEU app.</span>
        </footer>
      </div>
    </div>
  );
};

export default Workspace;
