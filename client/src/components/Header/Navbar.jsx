import React from 'react';
import { LogoutBtn, Container } from '../index.js'
import '../../assets/styles/style.css';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {

    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Sign Up",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "All Contacts",
            slug: "/all-contacts",
            active: authStatus
        },
        {
            name: "Add Contact",
            slug: "/add-contact",
            active: authStatus
        }
    ]

    return (
      <nav className="navbar">
        <div className="navbar-container">
            <div className="navbar-logo">
                ContactHub
            </div>

            <ul className='menu-items'>
                {
                    navItems.map(item => ( 
                        item.active && (
                            <li key={item.name} className='menu-item'>
                                {item.name}
                            </li>
                        )
                    ))
                }
                {
                    authStatus && (
                        <LogoutBtn />
                    )
                }
            </ul>

        </div>
        
      </nav>
    );
  };

export default Navbar;
