const express = require("express")
const controller = require("../controllers/auth.controllers")
const router = express.Router()

router.get("/login", controller.login)
router.post("/login", controller.postLogin)

module.exports = router