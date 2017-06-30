import React from 'react';
// import { Link } from 'react-router'

import SidebarRun from './Sidebar.run';
// import { initSvgReplace } from '../utils/Utils';

class Sidebar extends React.Component {

    constructor(props, context){
        super(props, context);
    }

    componentDidMount() {
      SidebarRun();
        // initSvgReplace();
    }

    render() {
        return (
            <aside className="sidebar-container">
              <div className="sidebar-header">
                  <div className="pull-right pt-lg text-muted hidden"><em className="ion-close-round"></em></div>
                  <a href="#" className="sidebar-header-logo"><img src="images/logo.png" data-svg-replace="img/logo.svg" alt="Logo" /><span className="sidebar-header-logo-text">Centric</span></a>
              </div>
              <div className="sidebar-content">
                  <div className="sidebar-toolbar text-center">
                      <a href=""><img src="img/user/01.jpg" alt="Profile" className="img-circle thumb64" /></a>
                      <div className="mt">Welcome, Willie Webb</div>
                  </div>
                  <nav className="sidebar-nav">
                      <ul>
                          <li className="active">
                            <span className="pull-right nav-label"><span className="badge bg-success">2</span></span><span className="nav-icon">
                            <img src="" data-svg-replace="img/icons/aperture.svg" alt="MenuItem" className="hidden" /></span>
                            <span>Dashboard</span>
                          </li>
                          <li className="">
                            <span className="pull-right nav-label"></span><span className="nav-icon">
                            <img src="" data-svg-replace="img/icons/radio-waves.svg" alt="MenuItem" className="hidden" /></span>
                            <span>Cards</span>
                          </li>

                      </ul>
                  </nav>
              </div>
            </aside>
        );
    }
}

export default Sidebar;
