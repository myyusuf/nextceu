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
                  <a href="#" className="sidebar-header-logo"><img src="images/logo.png" data-svg-replace="img/logo.svg" alt="Logo" /><span className="sidebar-header-logo-text">CEU</span></a>
              </div>
              <div className="sidebar-content">
                  <div className="sidebar-toolbar text-center">
                      <a href=""><img src="images/user/01.jpg" alt="Profile" className="img-circle thumb64" /></a>
                      <div className="mt">Welcome, Willie Webb</div>
                  </div>
                  <nav className="sidebar-nav">
                      <ul>
                        <li className="active">
                          <a href="#/dashboard" className="ripple">
                            <span className="pull-right nav-label">
                              <span className="badge bg-success">2</span>
                            </span>
                            <span className="nav-icon">
                              <img src="images/icons/aperture.svg" alt="MenuItem" style={{ color: 'blue' }} />
                              </span>
                              <span>
                                Dashboard
                              </span>
                              <span className="md-ripple">
                              </span>
                            </a>
                          </li>
                          <li className="">
                            <a href="#/students" className="ripple">
                              <span className="pull-right nav-label"></span>
                              <span className="nav-icon">
                                <img src="" data-svg-replace="img/icons/radio-waves.svg" alt="MenuItem" className="hidden" />
                              </span>
                              <span>Mahasiswa</span>
                              <span className="md-ripple"></span>
                            </a>
                          </li>
                          <li className="">
                            <a href="#/departments" className="ripple">
                              <span className="pull-right nav-label"></span>
                              <span className="nav-icon">
                                <img src="" data-svg-replace="img/icons/radio-waves.svg" alt="MenuItem" className="hidden" />
                              </span>
                              <span>Bagian</span>
                              <span className="md-ripple"></span>
                            </a>
                          </li>
                          <li className="">
                            <a href="cards.html" className="ripple">
                              <span className="pull-right nav-label"></span>
                              <span className="nav-icon">
                                <img src="" data-svg-replace="img/icons/radio-waves.svg" alt="MenuItem" className="hidden" />
                              </span>
                              <span>Rumah Sakit</span>
                              <span className="md-ripple"></span>
                            </a>
                          </li>
                          <li className="">
                              <a href="#" className="ripple">
                                  <span className="pull-right nav-caret"><em className="ion-ios-arrow-right"></em></span><span className="pull-right nav-label"></span><span className="nav-icon">
                                  <img src="" data-svg-replace="images/icons/connection-bars.svg" alt="MenuItem" className="hidden" /></span>
                                  <span>Laporan</span>
                              </a>
                              <ul className="sidebar-subnav">
                                  <li className="">
                                    <a href="cards.html" className="ripple">

                                      <span>Cost Unit</span>
                                      <span className="md-ripple"></span>
                                    </a>
                                  </li>
                              </ul>
                          </li>
                      </ul>
                  </nav>
              </div>
            </aside>
        );
    }
}

export default Sidebar;
