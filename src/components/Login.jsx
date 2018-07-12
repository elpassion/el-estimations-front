import React from 'react';
import Authentication from './Authentication';
import Logo from '../assets/images/logo_elp.svg';

export default function Login() {
  return (
    <main className="Login">
      <img className="Login__logo" src={ Logo } alt="logo" />

      <h1>
EL Estimations
      </h1>
      <h2 className="heading--secondary">
Please log in
      </h2>

      <Authentication className="Login__auth" />
    </main>
  );
}
