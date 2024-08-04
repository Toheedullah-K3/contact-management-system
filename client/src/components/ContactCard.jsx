import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaHeart, FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContactCard = ({ viewMode = 'grid', contactData, onDelete }) => {
    const defaultAvatar = 'https://i.imgur.com/6VBx3io.png';
    const navigate = useNavigate();
    const [showEditOption, setShowEditOption] = useState(null);

    const apiUrl = import.meta.env.VITE_API_URL;

    const handleCardClick = (contact) => {
        navigate(`/person/${contact._id}`, { state: { contact } });
    };

    const handleEditClicked = (contact) => {
        navigate(`/edit-contact/${contact._id}`, { state: { contact } });
    };

    const handleDeleteClicked = (contactId) => {
        onDelete(contactId);
    }


    const toggleEditOption = (contactId) => {
        setShowEditOption(showEditOption === contactId ? null : contactId);
    };

    return (
        <div>
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contactData.map((contact) => (
                        <div
                            key={contact._id}
                            className="relative bg-white p-6 rounded-lg shadow-sm border border-gray-300 transition-transform duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2"
                        >
                            <div className="absolute top-4 right-4 text-gray-500">
                                {contact.isFavourite && <FaHeart className="text-red-500 text-lg" />}
                                <div className="relative">
                                    <FaEllipsisV
                                        className="cursor-pointer"
                                        onClick={() => toggleEditOption(contact._id)}
                                    />
                                    {showEditOption === contact._id && (
                                        <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-300 rounded shadow-lg">
                                            <button
                                                onClick={() => handleEditClicked(contact)}
                                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClicked(contact._id)}
                                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="bg-gray-200 p-3 rounded-full mb-4">
                                    <img
                                        src={contact.avatar || defaultAvatar}
                                        alt={contact.name}
                                        className="w-16 h-16 object-cover rounded-full"
                                    />
                                </div>
                                <h2
                                    className="text-xl font-medium text-gray-800 mb-2 transition-colors duration-300 hover:text-green-700 hover:underline cursor-pointer"
                                    onClick={() => handleCardClick(contact)}
                                >
                                    {contact.name}
                                </h2>
                                <p className="text-gray-600 text-center mb-4">{contact.company}</p>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <FaPhone className="text-gray-500" />
                                        <span className="text-gray-700">{contact.phone}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FaEnvelope className="text-gray-500" />
                                        <span className="text-gray-700">{contact.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FaMapMarkerAlt className="text-gray-500" />
                                        <span className="text-gray-700">{contact.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {contactData.map((contact) => (
                        <div
                            key={contact._id}
                            className="bg-white p-4 rounded-lg shadow-sm border border-gray-300 flex justify-between items-center transition-transform duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2"
                        >
                            <div className="flex flex-col">
                                <span 
                                    className="text-lg font-medium text-gray-800 hover:text-green-700 duration-300 hover:underline cursor-pointer"
                                    onClick={() => handleCardClick(contact)}
                                >
                                        {contact.name}
                                </span>
                                <span className="text-gray-600">{contact.phone}</span>
                            </div>
                            <div className="flex flex-col text-right">
                                <div className="relative">
                                    <FaEllipsisV
                                        className="cursor-pointer"
                                        onClick={() => toggleEditOption(contact._id)}
                                    />
                                    {showEditOption === contact._id && (
                                        <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-300 rounded shadow-lg">
                                            <button
                                                onClick={() => handleEditClicked(contact)}
                                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClicked(contact._id)}
                                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContactCard;
