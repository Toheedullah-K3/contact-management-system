import { Router } from "express";
import { addContact, getAllContacts, getContact, editContact, deleteContact } from "../controllers/contact.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/addContact").post(verifyJWT, addContact)
router.route("/getAllContacts").get(verifyJWT, getAllContacts)
router.route("/getContact/:id").get(verifyJWT, getContact)
router.route("/editContact/:id").post(verifyJWT, editContact)
router.route("/deleteContact/:id").delete(verifyJWT, deleteContact)

export default router