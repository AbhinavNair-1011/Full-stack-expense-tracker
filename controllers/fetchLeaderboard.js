const { expenses, Data } = require("../models/expenses");

module.exports.fetchLeaderboard = async (req, res, next) => {
  try {
    let result = await Data.fetchLeaderboard();
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(404).json({
      status: "failed",
      err: err,
    });
  }
};
