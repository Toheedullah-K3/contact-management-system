import React, { useState } from 'react';
import { LogoutBtn, Container } from '../index.js';
import '../../assets/styles/style.css';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
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
    ];

    return (
        <nav className="bg-white shadow-md py-4">
            <div className="container mx-auto flex justify-between items-center px-6 relative">
              <NavLink 
                to="/"
                className="text-5xl font-extrabold text-blue-500">
                ContactHub
              </NavLink>

                <div className="md:hidden">
                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="text-gray-800 focus:outline-none z-60">
                        {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
                    </button>
                </div>

                {/* Side Slider for Mobile */}
                <div className={`fixed inset-y-0 right-0 mt-16 w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden z-50`}>
                    <ul className="space-y-4 p-6">
                        {
                            navItems.map(item => (
                                item.active && (
                                    <li key={item.name} className="relative group">
                                        <NavLink 
                                            to={item.slug} 
                                            className="text-gray-800 text-lg font-medium flex items-center group-hover:text-gray-600 transition duration-300"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                            <span className="absolute left-0 bottom-0 w-0 h-1 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                                        </NavLink>
                                    </li>
                                )
                            ))
                        }
                        {authStatus && (
                            <>
                                <li>
                                    <NavLink to="/profile">
                                        <button
                                            className="relative flex items-center justify-center text-gray-900 bg-gray-100 rounded-full overflow-hidden transition-all duration-300 hover:bg-gray-200 hover:w-[60px] w-[50px] h-[50px] flex-shrink-0 focus:outline-none"
                                        >
                                            <span className="absolute inset-0 bg-gray-200 opacity-30 group-hover:opacity-40 transition-opacity duration-300"></span>
                                            <div className="relative z-10 flex items-center justify-center">
                                                <FaUserCircle className="w-6 h-6 text-gray-900" />
                                            </div>
                                        </button>
                                    </NavLink>
                                </li>
                                <li>
                                    <LogoutBtn />
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                {/* Regular Navbar for Desktop */}
                <ul className="hidden md:flex space-x-8 items-center">
                    {
                        navItems.map(item => (
                            item.active && (
                                <li key={item.name} className="relative group">
                                    <NavLink 
                                        to={item.slug} 
                                        className="text-gray-800 text-lg font-medium flex items-center group-hover:text-gray-600 transition duration-300"
                                    >
                                        {item.name}
                                        <span className="absolute left-0 bottom-0 w-0 h-1 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                                    </NavLink>
                                </li>
                            )
                        ))
                    }
                    {authStatus && (
                        <>
                            <li>
                                <NavLink to="/profile">
                                    <button
                                        className="relative flex items-center justify-center text-gray-900 bg-gray-100 rounded-full overflow-hidden transition-all duration-300 hover:bg-gray-200 hover:w-[60px] w-[50px] h-[50px] flex-shrink-0 focus:outline-none"
                                    >
                                        <span className="absolute inset-0 bg-gray-200 opacity-30 group-hover:opacity-40 transition-opacity duration-300"></span>
                                        <div className="relative z-10 flex items-center justify-center">
                                            <FaUserCircle className="w-6 h-6 text-gray-900" />
                                        </div>
                                    </button>
                                </NavLink>
                            </li>
                            <li>
                                <LogoutBtn />
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
