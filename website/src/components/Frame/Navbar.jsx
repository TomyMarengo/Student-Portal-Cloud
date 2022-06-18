import React from 'react';
import {useLocation} from "react-router-dom";

const Navbar = ({

}) => {

  const location = useLocation();

  const isActive = path => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Inicio</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className={`nav-link ${isActive('/subjects')}`} aria-current="page" href="/subjects">Materias</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;