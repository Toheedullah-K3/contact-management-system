import { Router } from "express";
import { addContact, getAllContacts, getContact, editContact } from "../controllers/contact.controller.js";
const router = Router()

router.route("/addContact").post(addContact)
router.route("/getAllContacts").get(getAllContacts)
router.route("/getContact/:id").get(getContact)
router.route("/editContact/:id").post(editContact)
export default router