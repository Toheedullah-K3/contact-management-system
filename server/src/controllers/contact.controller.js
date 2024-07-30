import { Contact } from "../models/contact.model.js";

const addContact = async (req, res) => {
    // get Contact Details from User
    // Validate if not empty
    // check if contact is already added - by Contact Number
    // create a Contact - create entry in db
    // check for contact creation
    // return res
     
    const {name, email, phone, address, relationShip, company, notes, isFavorite, socialMedia} = req.body

    if (
        [name, phone].some((field) => field?.trim() === "")
    ) {
        return res.status(400).send("Please enter Name & PhoneNo.")
    }

    const existingContact = await Contact.findOne({phone})
    

    if(existingContact){
        return res.status(400).send("This Contact is Already Saved!")
    }

    try {
        const contact = await Contact.create({
            name, email, phone, 
            address, relationShip,
            company, notes, isFavorite, 
            socialMedia
        })
        console.log("In try Block")
        const createdContact = await Contact.findById(contact._id)

        return res.status(200).json({
            createdContact
        })
    } catch (error) {
        console.log("I am Error here !!!!!!!", error)

        return res.status(500).send("Error! Uploading Contact")
    }
}

const getAllContacts = async(req, res) => {
    try {
        const contacts = await Contact.find({}) 
        return res.status(200).json({
            contacts
        })
    } catch (error) {
        return res.status(500).send("Server Error Fetching Contacts")
    }
}

const getContact = async (req, res) => {
    try {
        const { id } = req.params
        const contact = await Contact.findById(id)
        if (!contact) {
            return res.status(404).send("Contact Not Found");
        }
        return res.status(200).json({
            contact
        })
    } catch (error) {
        return res.status(500).send("Server Error Fetching Contact Details")
    }
}

const editContact = async (req, res) => {
    const {name, email, phone, address, relationShip, company, notes, isFavorite, socialMedia} = req.body
    try {
        const { id } = req.params
        Contact.findByIdAndUpdate(
            id, 
            {
                $set: {
                    name, email, phone, 
                    address, relationShip, 
                    company, notes, isFavorite, 
                    socialMedia
                }
            },
            { new: true }
        )
    } catch (error) {
        return res.status(500).send("Server Error Editing Contact Details")
    }
}
export {
    addContact,
    getAllContacts,
    getContact,
    editContact
}