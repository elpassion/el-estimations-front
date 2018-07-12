import React from 'react';
import Authentication from './Authentication';
import Logo from '../assets/images/logo_elp.svg';

function Navbar() {
  return (
    <header className="Navbar">
      <div className="container Navbar__container">
        <img className="Navbar__logo" src={ Logo } alt="logo" />

        <nav className="Navbar__menu">
          <a href="/">
            link 1
          </a>
          <a href="/">
            link 2
          </a>
          <a href="/">
            link 3
          </a>
        </nav>

        <Authentication className="Navbar__auth" />
      </div>
    </header>
  );
}

export default Navbar;
