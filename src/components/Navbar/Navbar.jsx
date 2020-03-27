import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css'
import Logo from '../../images/Logo.png';

export default function Navbar(prop) {
  return (
    <div className="Navbar">
      <img className="Navbar__logo" src={Logo} alt="Logo"/>
      <ul className="Navbar__menu">
        <li className="Navbar__item">
          <NavLink exact className="Navbar__link" to="/" activeClassName="active" href="#">Inicio</NavLink>
        </li>
        <li className="Navbar__item">
          <NavLink exact className="Navbar__link" to="/kanban" activeClassName="active" href="#">Kanban</NavLink>
        </li>
      </ul>
    </div>
  )
}

