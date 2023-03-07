const express = require("express");
const router = new express.Router();
const controllers = require("../Controllers/usersControllers");
const upload = require("../multerconfig/storageConfig");

// Routes
router.post("/user/register",upload.single("user_profile"),controllers.userpost);
router.get("/user/details",controllers.userget)

module.exports = router