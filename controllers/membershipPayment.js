const { response } = require("express");
const { payments, Payments } = require("../models/payments");

module.exports.paymentDetails = async (req, res, next) => {
  try {
    let userEmail = req.userDetails.userEmail;
    let payment = new Payments(
      req.body.razorpay_payment_id,
      req.body.razorpay_order_id,
      req.body.razorpay_signature
    );

    let result = await payment.insertIntoDatabase(userEmail);

    return res.json({
      status: "successfull",
    });
  } catch (err) {
    return res.json({
      status: "failed",
      err: err,
    });
  }
};
