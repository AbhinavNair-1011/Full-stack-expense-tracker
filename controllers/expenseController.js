const { expenses, Data } = require("../models/expenses");

let fetchData = async (req, res, next) => {
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

let addData = async (req, res, next) => {
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

let updateData = async (req, res, next) => {
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

let deleteData = async (req, res, next) => {
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

let fetchLeaderboard = async (req, res, next) => {
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

let downloadExpenses = async (req, res, next) => {
  try {
    let email = req.userDetails.userEmail;
    let id = req.userDetails.userId;

    let result = await Data.downloadExpense(email, id);

    return res.json({
      status: "success",
      data: result,
    });
  } catch (err) {
    return res.json({
      status: "failed",
      errorMsg: err,
    });
  }
};

let expensesPagination = async (req, res, next) => {
  try {
    let totalCount = await expenses.count({
      where: { userId: req.userDetails.userId },
    });
    let limit;
    if (req.query.rowNumber !== undefined) {
      limit = parseInt(req.query.rowNumber);
    } else {
      limit = 10;
    }
    let pageNumber;
    if (req.query.number !== undefined) {
      pageNumber = parseInt(req.query.number);
    } else {
      pageNumber = 1;
    }
    let totalPageCount = Math.ceil(totalCount / limit);
    let offset = (pageNumber - 1) * limit;
    let paginatedExpenses = await expenses.findAll({
      where: {
        userId: req.userDetails.userId,
      },
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    return res.json({
      status: "successfull",
      totalPageCount: totalPageCount,
      paginatedExpenses: paginatedExpenses,
      email: req.userDetails.userEmail,
      name: req.userDetails.userName,
      currentPageNumber: pageNumber,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: "failed",
    });
  }
};

module.exports = {
  fetchData,
  fetchData,
  addData,
  updateData,
  deleteData,
  fetchLeaderboard,
  downloadExpenses,
  expensesPagination,
};
