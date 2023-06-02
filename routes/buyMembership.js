const controller = require("../controllers/membershipCreateOrder");
const controller2 = require("../controllers/membershipPayment");
const controller3 = require("../controllers/validateMembership");

const jwtVerify = require("../middlewares/jwt");

const router = require("express").Router();

router.post("/api/buy-membership/create-order", controller.createOrder);
router.post(
  "/api/buy-membership/payment",
  jwtVerify,
  controller2.paymentDetails
);
router.post(
  "/api/buy-membership/validate-membership",
  jwtVerify,
  controller3.validateMembership
);

module.exports = router;
