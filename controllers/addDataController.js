const { Data } = require("../models/expenses");

module.exports.addData = async (req, res, next) => {
  try {
    const data = req.body;
    const expense = new Data(
      data.expenseItem,
      data.expensePrice,
      req.userDetails.userEmail
    );

    let result = await expense.insertIntoDatabase();

    return res.status(200).json({
      status: "succcess",
      data: result,
    });
  } catch (err) {
    return res.status(404).json({
      status: "failed",
      errorMsg: err,
    });
  }
};
