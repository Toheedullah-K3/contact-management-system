import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { ContactForm } from '../components/index.js'
import axios from 'axios'

const EditContact = () => {
    const { id } = useParams()

    const [currentContact, setCurrentContact] = useState() 
    const apiUrl = import.meta.env.VITE_API_URL;

    const getContact = async () => {
        const response = await axios.get(`${apiUrl}/contact/getContact/${id}`, {
          withCredentials: true
        })

        const { contact } = response.data

        setCurrentContact(contact)

    }

    useEffect( () => {
        getContact()
    }, [id])
  return (
    <div>
      <ContactForm contact={currentContact}/>
    </div>
  )
}

export default EditContact
