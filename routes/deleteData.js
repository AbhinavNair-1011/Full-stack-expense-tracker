const express = require("express");
const router = express.Router();
const controller = require("../controllers/deleteDataController");
const jwtVerify = require("../middlewares/jwt");

router.delete(
  "/api/delete-data/:email/:itemName",
  jwtVerify,
  controller.deleteData
);
module.exports = router;
