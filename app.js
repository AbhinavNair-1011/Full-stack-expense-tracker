let express = require("express");
let app = express();

let cors = require("cors");

const sequelize = require("./database/connection");
const Sequelize = require("sequelize");

const user=require("./routes/user")
const expense = require("./routes/expense");

const { users } = require("./models/users");
const { expenses } = require("./models/expenses");
const { payments } = require("./models/payments");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(__dirname + "/public"));

users.hasMany(expenses);
expenses.belongsTo(users);

users.hasOne(payments);
payments.belongsTo(users);


app.use(user);
app.use(expense);

sequelize
  .sync({force:false})
  .then((result) => {
    app.listen(3000, () => {
      console.log("connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });
