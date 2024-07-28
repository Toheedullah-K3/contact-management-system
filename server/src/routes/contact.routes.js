import { Router } from "express";
import { addContact, getAllContacts } from "../controllers/contact.controller.js";
const router = Router()

router.route("/addContact").post(addContact)
router.route("/getAllContacts").get(getAllContacts)
export default router