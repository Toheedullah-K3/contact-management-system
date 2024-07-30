import { Router } from "express";
import { addContact, getAllContacts, getContact } from "../controllers/contact.controller.js";
const router = Router()

router.route("/addContact").post(addContact)
router.route("/getAllContacts").get(getAllContacts)
router.route("/getContact").get(getContact)
export default router