const { Data } = require("../models/expenses");

module.exports.fetchData = async (req, res, next) => {
  try {
    let result = await Data.fetchAll(req.userDetails.userEmail);

    return res.status(200).json({
      status: "success",
      data: {
        result,
      },
      email: req.userDetails.userEmail,
      name: req.userDetails.userName,
    });
  } catch (err) {
    return res.status(200).json({
      status: "failed",
      errorMsg: "no expenses",
    });
  }
};
