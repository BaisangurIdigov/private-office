const { Router } = require("express")
const { contactController } = require("../../controllers/contact.Controller/contact.controller")
const router = Router()

router.get("/contacts", contactController.getContacts)
router.post("/create/contact", contactController.createContact)

module.exports = router