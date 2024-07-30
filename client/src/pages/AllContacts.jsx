import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTh, FaList } from 'react-icons/fa';
import { ContactCard } from '../components/index'


const getContacts = async (setContacts) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await axios.get(`${apiUrl}/contact/getAllContacts`);
    const { contacts } = response.data;
    setContacts(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
  }
};

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [editMode, setEditMode] = useState(false)
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    getContacts(setContacts);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-50 to-blue-100 p-8">
      <div className="max-w-5xl mx-auto bg-white p-12 rounded-2xl shadow-xl border border-gray-200 bg-opacity-90">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Contacts</h1>
          <div className="flex space-x-4">
            <button
              className={`p-2 rounded-full ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-gray-100'} hover:bg-gray-300 transition-colors`}
              onClick={() => setViewMode('grid')}
            >
              <FaTh className={`text-xl ${viewMode === 'grid' ? 'text-gray-800' : 'text-gray-500'}`} />
            </button>
            <button
              className={`p-2 rounded-full ${viewMode === 'list' ? 'bg-gray-200' : 'bg-gray-100'} hover:bg-gray-300 transition-colors`}
              onClick={() => setViewMode('list')}
            >
              <FaList className={`text-xl ${viewMode === 'list' ? 'text-gray-800' : 'text-gray-500'}`} />
            </button>
          </div>
        </div>
        
        <ContactCard 
          viewMode= {viewMode}
          contactData = {contacts}
        />
      </div>
    </div>
  );
};

export default ContactsPage;
