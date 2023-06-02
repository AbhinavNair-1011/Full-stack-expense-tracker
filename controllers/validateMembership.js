const { users, Users } = require("../models/users");
const jwt = require("jsonwebtoken");

module.exports.validateMembership = async (req, res, next) => {
  try {
    let email = req.userDetails.userEmail;
    let result = await Users.validateMembership(email);

    if (result.dataValues.isPremiumMember) {
      return res.json({
        status: "successfull",
        isPremiumMember: true,
      });
    } else {
      return res.json({
        status: "successfull",
        isPremiumMember: false,
      });
    }
  } catch (err) {
    return res.json({
      status: "failed",
      error: err,
    });
  }
};
