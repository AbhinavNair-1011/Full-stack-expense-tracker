const { expenses, Data } = require("../models/expenses");

module.exports.updateData = async (req, res, next) => {
  try {
    let result = await Data.updateData(req.body, req.userDetails);

    return res.json({
      status: "success",
      data: [result.expenseItem, result.expensePrice, result.updatedAt],
    });
  } catch (err) {
    return res.json({
      status: "failed",
      errorMsg: err,
    });
  }
};
