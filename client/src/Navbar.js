import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar(props) {
  const { login } = props;

  return (
    <div className='nav-main-section'>
      <div className='nav-logo'>
        <img src="https://i.pinimg.com/originals/f4/82/a0/f482a0e44a6b5dc9163352c3c6135ea0.jpg" alt="logo" />    
      </div>
      {!login ? (
        <div className='nav-items'>
          <div className='nav-item'> <NavLink exact to="/" activeClassName="active">Login</NavLink></div>
          <div className='nav-item'> <NavLink to="/register" activeClassName="active">Register</NavLink></div>
        </div>
      ) : (
        <div className='nav-items'>
          <div className='nav-item'> <NavLink to="/mychat" activeClassName="active">Chat</NavLink></div>
          <div className='nav-item'> <NavLink to="/network" activeClassName="active">Network</NavLink></div>
          <div className='nav-item'> <NavLink to="/settings" activeClassName="active">Profile</NavLink></div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
