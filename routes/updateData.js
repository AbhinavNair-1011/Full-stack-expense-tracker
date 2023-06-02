const express = require("express");
const router = express.Router();
const controller = require("../controllers/updateDataController");
const jwtVerify = require("../middlewares/jwt");

router.patch("/api/update-data", jwtVerify, controller.updateData);

module.exports = router;
