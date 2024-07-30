import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FaFacebook, FaLinkedin, FaGithub, FaPhone, FaEnvelope, FaShareAlt, FaBuilding, FaMapMarkerAlt, FaStickyNote , FaUser } from 'react-icons/fa';

const ContactDetails = () => {

    const { id } = useParams();
    const location = useLocation();
    const { contact } = location.state || {};

    console.log(contact)
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 py-12">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-2xl ring-1 ring-gray-200">
                {contact ? (
                    <div className="flex flex-col lg:flex-row lg:space-x-8">
                        <div className="flex-shrink-0 mb-6 lg:mb-0">
                            <img
                                src={contact.avatar || 'https://via.placeholder.com/150x150'}
                                alt={contact.name}
                                className="w-36 h-36 rounded-full border-4 border-gradient-to-r from-blue-500 via-teal-500 to-pink-500 object-cover shadow-lg"
                            />
                        </div>
                        <div className="flex-1 space-y-6">
                            <h2 className="text-4xl font-extrabold text-gray-900 flex items-center">
                                <FaUser className="w-6 h-6 text-gray-700 mr-2" />
                                {contact.name || 'No Name Available'}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md">
                                    <FaPhone className="w-6 h-6 text-gray-600" />
                                    <div className="ml-3 flex-1">
                                        <span className="font-semibold text-gray-700">Phone</span>
                                        <p className={`ml-3 text-gray-800 ${!contact.phone ? 'text-gray-400 italic' : ''}`}>
                                            {contact.phone || 'Not Provided'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md">
                                    <FaEnvelope className="w-6 h-6 text-gray-600" />
                                    <div className="ml-3 flex-1">
                                        <span className="font-semibold text-gray-700">Email</span>
                                        <p className={`ml-3 text-gray-800 ${!contact.email ? 'text-gray-400 italic' : ''}`}>
                                            {contact.email || 'Not Provided'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md">
                                    <FaBuilding className="w-6 h-6 text-gray-600" />
                                    <div className="ml-3 flex-1">
                                        <span className="font-semibold text-gray-700">Company</span>
                                        <p className={`ml-3 text-gray-800 ${!contact.company ? 'text-gray-400 italic' : ''}`}>
                                            {contact.company || 'Not Provided'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md">
                                    <FaMapMarkerAlt className="w-6 h-6 text-gray-600" />
                                    <div className="ml-3 flex-1">
                                        <span className="font-semibold text-gray-700">Address</span>
                                        <p className={`ml-3 text-gray-800 ${!contact.address ? 'text-gray-400 italic' : ''}`}>
                                            {contact.address || 'Not Provided'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md">
                                    <FaStickyNote className="w-6 h-6 text-gray-600" />
                                    <div className="ml-3 flex-1">
                                        <span className="font-semibold text-gray-700">Notes</span>
                                        <p className={`ml-3 text-gray-800 ${!contact.notes ? 'text-gray-400 italic' : ''}`}>
                                            {contact.notes || 'Not Provided'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md">
                                    <FaUser  className="w-6 h-6 text-gray-600" />
                                    <div className="ml-3 flex-1">
                                        <span className="font-semibold text-gray-700">Relationship Type</span>
                                        <p className={`ml-3 text-gray-800 ${!contact.relationShip ? 'text-gray-400 italic' : ''}`}>
                                            {contact.relationShip || "Not Provided"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col p-6 bg-gray-50 rounded-lg shadow-md space-y-4">
                                    <div className="flex items-center mb-4">
                                        <FaShareAlt className="w-6 h-6 text-gray-600 mr-3" />
                                        <h3 className="text-lg font-semibold text-gray-800">Social Media</h3>
                                    </div>
                                    <div className="flex flex-col space-y-3">
                                        <div className="flex items-center">
                                            <FaFacebook className="w-6 h-6 text-gray-600" />
                                            <div className="ml-3 flex-1">
                                                {contact.socialMedia?.facebook ? (
                                                    <a
                                                        href={contact.socialMedia.facebook}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        {contact.socialMedia.facebook}
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-500 italic">Not Provided</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <FaLinkedin className="w-6 h-6 text-gray-600" />
                                            <div className="ml-3 flex-1">
                                                {contact.socialMedia?.linkedin ? (
                                                    <a
                                                        href={contact.socialMedia.linkedIn}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-700 hover:text-blue-900"
                                                    >
                                                        {contact.socialMedia.linkedIn}
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-500 italic">Not Provided</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <FaGithub className="w-6 h-6 text-gray-600" />
                                            <div className="ml-3 flex-1">
                                                {contact.socialMedia?.github ? (
                                                    <a
                                                        href={contact.socialMedia.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-800 hover:text-gray-600"
                                                    >
                                                        {contact.socialMedia.github}
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-500 italic">Not Provided</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">Loading contact details...</p>
                )}
                
            </div>
        </div>
    );
};

export default ContactDetails;
