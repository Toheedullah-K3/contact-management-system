import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { ContactForm } from '../components/index.js'
import axios from 'axios'

const EditContact = () => {
    const { id } = useParams()

    const [currentContact, setCurrentContact] = useState() 
    const apiUrl = import.meta.env.VITE_API_URL;

    const getContact = async () => {
        const response = await axios.get(`${apiUrl}/contact/getContact/${id}`)

        console.log(response)
        const { contact } = response.data
        console.log("Edit Contact Runn")
        console.log(contact.name)
        setCurrentContact(contact)
    }

    useEffect( () => {
        getContact()
    }, [])
  return (
    <div>
      <ContactForm contact={currentContact}/>
    </div>
  )
}

export default EditContact
