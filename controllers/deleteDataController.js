const { Data } = require("../models/expenses");

module.exports.deleteData = async (req, res, next) => {
  try {
    let name = req.params.itemName;
    let email = req.userDetails.userEmail;
    let price = req.body.itemPrice;

    let toBeDeleted = await Data.deleteFromDatabase(name, email, price);

    if (toBeDeleted) {
      await toBeDeleted.destroy();

      return res.status(200).json({
        status: "success",
      });
    } else {
      return res.status(404).json({
        status: "failed",
        errorMsg: "does not exits",
      });
    }
  } catch (err) {
    return res.status(404).json({
      status: "failed",
      errorMsg: err + "does not exists",
    });
  }
};
