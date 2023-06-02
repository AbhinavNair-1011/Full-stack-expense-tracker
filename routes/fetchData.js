const express = require("express");
const router = express.Router();
const controller = require("../controllers/fetchDataController");
const jwtVerify = require("../middlewares/jwt");

router.get("/api/fetch-data", jwtVerify, controller.fetchData);

module.exports = router;
