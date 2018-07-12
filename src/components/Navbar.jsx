import React from 'react';
import { NavLink } from 'react-router-dom';

import Authentication from './Authentication';

import Logo from '../assets/images/logo_elp.svg';

function Navbar() {
  return (
    <header className="Navbar">
      <div className="container Navbar__container">
        <img className="Navbar__logo" src={ Logo } alt="logo" />

        <nav className="Navbar__menu">
          <NavLink to="/" className="Navbar__link" exact activeClassName="Navbar__link--active">
Test Page
          </NavLink>
          <NavLink to="/other" className="Navbar__link" activeClassName="Navbar__link--active">
Other Page
          </NavLink>
        </nav>

        <Authentication className="Navbar__auth" />
      </div>
    </header>
  );
}

export default Navbar;
