import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaTh, FaList } from 'react-icons/fa'
import ContactCard from '../components/ContactCard';
import '../assets/styles/style.css'; 
import { useSelector } from 'react-redux'

const apiUrl = import.meta.env.VITE_API_URL;

const fetchContacts = async () => {
  
  try { 
    const response = await axios.get(`${apiUrl}/contact/getAllContacts`, { 
      withCredentials: true 
    });

    return response.data.contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error)
    throw error
  }
};

const ContactsPage = () => {
  const authStatus = useSelector(state => state.auth.status)
  
  const [contacts, setContacts] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);  


  const loadContacts = async () => {
    setLoading(true); 
    try {
      const contactsData = await fetchContacts();
      setContacts(contactsData.reverse()); 
    } catch (error) {
      setError('Failed to fetch contacts'); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    loadContacts();
  }, []); 


  const handleContactDeleted = async (contactId) => {
    setDeleteLoading(true); 
    try {
      await axios.delete(`${apiUrl}/contact/deleteContact/${contactId}`, {
        withCredentials: true
      });
      await loadContacts(); 
    } catch (error) {
      console.error("Error deleting contact:", error);
      setError('Failed to delete contact'); 
    } finally {
      setDeleteLoading(false); 
    }
  };

  if (loading) return <div className="spinner-container"><div className="spinner"></div></div>;
  if (error) return <p>{error}</p>;

  if(!authStatus) return <h1 
                            className='text-5xl flex justify-center'>
                            Please Login to see this Page
                          </h1>

  return (
    
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-50 to-blue-100 p-8">
      {deleteLoading && (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p className="text-center text-gray-600 mt-2">Deleting...</p>
          </div>
        )}
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
          viewMode={viewMode}
          contactData={contacts}
          onDelete={handleContactDeleted} 
        />
        
        
      </div>
    </div>
  );
};

export default ContactsPage;
