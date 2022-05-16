
const express = require('express');
const router = express.Router();
const registerUser = require("./")

router.route("/").post(registerUrser);
// router.post("/login", authUser);

// module.exports = router;