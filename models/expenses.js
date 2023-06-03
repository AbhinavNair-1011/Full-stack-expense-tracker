const sequelize = require("../database/connection");
const Sequelize = require("sequelize");
const { users, Users } = require("../models/users");
const{DataTypes}=require("sequelize")

const expenses = sequelize.define("expenses", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,   
    primaryKey: true,
  },
  expenseItem: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  expensePrice: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
});

class Data {
  constructor(expenseItem, expensePrice, email) {
    this.item = expenseItem;
    this.price = expensePrice;
    this.email = email;
  }

  static async fetchAll(email) {
    try {
      let user = await users.findOne({
        where: {
          email: email,
        },
      });
      let expense = await expenses.findAll({
        where: {
          userId: user.dataValues.id,
        },
      });

      return expense;
    } catch (err) {
      res.json({
        status: "failed",
        error: err,
      });
    }
  }
  async insertIntoDatabase() {
    try {
      let user = await users.findOne({
        where: {
          email: this.email,
        },
      });
      let userId = user.dataValues.id;
      return expenses.create({
        expenseItem: this.item.toUpperCase(),
        expensePrice: this.price,
        userId: userId,
      });
    } catch (err) {
      return err;
    }
  }

  static async updateData(data, userDetails) {
    try {
      let user = await users.findOne({
        where: {
          email: userDetails.userEmail,
        },
      });

      let id = user.dataValues.id;

      let expense = await expenses.findOne({
        where: {
          userId: id,
          expenseItem: data.currentExpenseItem,
          expensePrice: data.currentPrice,
        },
      });
      if (data.todo === "onlyItemName") {
        return await expense.update({
          expenseItem: data.newExpenseItem.toUpperCase(),
        });
      } else if (data.todo === "onlyItemPrice") {
        return await expense.update({
          expensePrice: data.newExpensePrice,
        });
      } else if (data.todo === "itemName&itemPrice") {
        return await expense.update({
          expenseItem: data.newExpenseItem.toUpperCase(),
          expensePrice: data.newExpensePrice,
        });
      }
    } catch (err) {
      return err;
    }
  }

  static async deleteFromDatabase(name, email, price) {
    try {
      let user = await users.findOne({
        where: {
          email: email,
        },
      });

      let id = user.dataValues.id;

      return await expenses.findOne({
        where: {
          userId: id,
          expenseItem: name,
          expensePrice: price,
        },
      });
    } catch (err) {
      return err;
    }
  }

  static async fetchLeaderboard() {
    try {
      return await users.findAll({
        attributes: [
          "id",
          "name",
          [
            sequelize.fn("sum", sequelize.col("expenses.expensePrice")),
            "totalAmount",
          ],
        ],
        include: [
          {
            model: expenses,
            attributes: [],
          },
        ],
        group: ["users.id"],
        order: [["totalAmount", "DESC"]],
      });
    } catch (err) {
      return err;
    }
  }
}

module.exports = { Data, expenses };
