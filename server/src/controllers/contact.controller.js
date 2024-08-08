import { Contact } from "../models/contact.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addContact = async (req, res) => {
    // get Contact Details from User
    // Validate if not empty
    // check if contact is already added - by Contact Number
    // create a Contact - create entry in db
    // check for contact creation
    // return res
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).send("Unauthorized");
    }
    const { name, email, phone, address, relationShip, company, notes, isFavorite, socialMedia } = req.body

    if (
        [name, phone].some((field) => field?.trim() === "")
    ) {
        return res.status(400).send("Please enter Name & PhoneNo.")
    }

    // const existingContact = await Contact.findOne({userId, phone})


    // if(existingContact){
    //     return res.status(400).send("This Contact is Already Saved!")
    // }
    console.log(req.file)
    const localFilePath = req.file?.path;
    const contactAvatar = await uploadOnCloudinary(localFilePath)

    try {
        const contact = await Contact.create({
            name, email, phone,
            address, relationShip,
            contactAvatar: contactAvatar?.url || "", 
            company, notes, isFavorite,
            socialMedia, userId
        })

        const createdContact = await Contact.findById(contact._id)

        // console.log(createdContact)
        return res.status(200).json({
            createdContact
        })
    } catch (error) {
        console.log("I am Error here !!!!!!!", error)

        return res.status(500).send("Error! Uploading Contact")
    }
}

const getAllContacts = async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).send("Unauthorized");
    }
    try {
        const contacts = await Contact.find({ userId })
        return res.status(200).json({
            contacts
        })
    } catch (error) {
        return res.status(500).send("Server Error Fetching Contacts")
    }
}

const getContact = async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).send("Unauthorized");
    }
    try {
        const { id } = req.params
        const contact = await Contact.findOne({ _id: id, userId })
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
    const { name, email, phone, address, relationShip, company, notes, isFavorite, socialMedia } = req.body
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).send("Unauthorized");
    }
    try {

        const { id } = req.params
        const contact = await Contact.findOneAndUpdate(
            { _id: id, userId },
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
        if (!contact) {
            return res.status(400).send("Cannot find the Contact!!")
        }
        return res.status(200).json({
            contact
        })
    } catch (error) {
        return res.status(500).send("Server Error Editing Contact Details")
    }
}

const deleteContact = async (req, res) => {

    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).send("Unauthorized");
    }
    try {

        const result = await Contact.deleteOne({ _id: id, userId });

        if (result.deletedCount === 0) {
            return res.status(404).send("Contact not found");
        }

        return res.status(200).send("Contact Deleted Successfully");
    } catch (error) {
        console.error("Error deleting contact:", error);
        return res.status(500).send("Server Error, Deleting Contact");
    }
};

export {
    addContact,
    getAllContacts,
    getContact,
    editContact,
    deleteContact
}