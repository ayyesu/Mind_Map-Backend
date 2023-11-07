const messageController = require("../controller/admin_request.controller");
const express = require("express");

const router = express.Router();

router.post("/", messageController);

module.exports = router;
