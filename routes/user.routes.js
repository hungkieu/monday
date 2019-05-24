const controller = require("../controllers/user.controllers")
const express = require("express")

const router = express.Router()

router.get("/index", controller.index)

module.exports = router