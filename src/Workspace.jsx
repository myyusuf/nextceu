import React from 'react';
import Header from './workspace/Header';

const Workspace = ({ children }) => {

  return (
    <div className="layout-container">
      <Header />
    </div>
  );
};

export default Workspace;
