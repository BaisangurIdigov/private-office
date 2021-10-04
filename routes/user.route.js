const { Router } = require("express")
const { userController } = require("../controllers/user.controller")
const router = Router()

router.post("/auth", userController.registerUser)
router.post("/login", userController.logIn)

module.exports = router