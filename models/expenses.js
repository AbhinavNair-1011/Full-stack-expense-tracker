const sequelize = require("../database/connection");
const { users, Users } = require("../models/users");
const{DataTypes,Sequelize}=require("sequelize");
const awsConnect=require("../services/aws")


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
    let t=await sequelize.transaction();
    try {
      let user = await users.findOne({
        where: {
          email: this.email
        }
      });
      let userId = user.dataValues.id;
      let expense=await expenses.create({
        expenseItem: this.item.toUpperCase(),
        expensePrice: this.price,
        userId: userId
      },{transaction:t});
      t.commit();
      return expense;
    } catch (err) {
      t.rollback();
      return err;
    }
  }

  static async updateData(data, userDetails) {
    let t=await sequelize.transaction()
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
        let updatedExpense=await expense.update({
          expenseItem: data.newExpenseItem.toUpperCase(),
        },{transaction:t});
        t.commit();
        return updatedExpense
      } else if (data.todo === "onlyItemPrice") {
        let updatedExpense=await expense.update({
          expensePrice: data.newExpensePrice,
        },{transaction:t});
        t.commit();
        return updatedExpense
      } else if (data.todo === "itemName&itemPrice") {
        let updatedExpense=await expense.update({
          expenseItem: data.newExpenseItem.toUpperCase(),
          expensePrice: data.newExpensePrice,
        },{transaction:t});
        t.commit();
        return updatedExpense
      }
    } catch (err) {
      t.rollback();
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
  static async downloadExpense(email, id) {
    try {
      let awsS3 = awsConnect();
      let result = await Data.fetchAll(email);
      let stringData = JSON.stringify(result);
  
      let options = {
        Bucket: "expensedownloadbucket",
        Key: `expense/${id}/${new Date().toISOString()}.txt`,
        Body: stringData,
        ACL:"public-read"
      };
  
      return new Promise((resolve, reject) => {
        awsS3.upload(options, (err, uploaded) => {
          if (err) {
            reject(err);
          } else {
            resolve(uploaded);
          }
        });
      });
    } catch (err) {
      throw err;
    }
  }

  
}

module.exports = { Data, expenses };
