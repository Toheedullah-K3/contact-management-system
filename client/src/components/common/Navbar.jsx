import React from 'react';
import '../../assets/styles/style.css';


const Navbar = () => {
    return (
      <nav className="navbar">
        <div className="navbar-container">
            <div className="navbar-logo">
                ContactHub
            </div>

            <div className="navbar-items-container">
                <a href="#" className="menu-item"> Login </a>
                <a href="#" className="menu-item"> Register </a>
            </div>
        </div>
      </nav>
    );
  };

export default Navbar;
