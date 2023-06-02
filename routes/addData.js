const express = require("express");
const router = express.Router();
const controller = require("../controllers/addDataController");
const jwtVerify = require("../middlewares/jwt");

router.post("/api/add-data", jwtVerify, controller.addData);
module.exports = router;
