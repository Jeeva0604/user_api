const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");

router.post("/add_user", userController.add_user);

module.exports = router;

