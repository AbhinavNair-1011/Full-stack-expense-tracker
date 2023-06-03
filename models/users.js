const sequelize = require("../database/connection");
const Sequelize = require("sequelize");
const {DataTypes}=require("sequelize")
const dotenv = require("dotenv").config();
const Sib = require("sib-api-v3-sdk");
const { otp, Otp } = require("./otp");

const users = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    notNull: true,
  },
  email: {
    type: Sequelize.STRING,
    notNull: true,
    unique: true,
  },
  phoneNumber: {
    type: Sequelize.BIGINT,
    notNull: true,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    notNull: true,
  },
  isPremiumMember: {
    type: Sequelize.BOOLEAN,
    notNull: true,
  },
});

class Users {
  constructor(name, email, phoneNumber, password, isPremiumMember) {
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.isPremiumMember = isPremiumMember;
  }
  async addUser() {
    try {
      return await users.create({
        name: this.name,
        email: this.email,
        phoneNumber: this.phoneNumber,
        password: this.password,
        isPremiumMember: this.isPremiumMember,
      });
    } catch (err) {
      return err;
    }
  }

  static async validateUser(userDetails) {
    try {
      return await users.findOne({
        where: { email: userDetails.email },
      });
    } catch (err) {
      return err;
    }
  }
  static async validateMembership(email) {
    try {
      return await users.findOne({
        where: { email: email },
      });
    } catch (err) {
      return err;
    }
  }

  static async forgotPassword(userEmail) {
    try {
      let user = await users.findAll({
        where: {
          email: userEmail,
        },
      });
      if (user) {
        let generatedOtp = Math.floor(
          Math.random() * ((999999-100000 ) + 1) + 100000
        );

        const client = Sib.ApiClient.instance;
        const apiKey = client.authentications["api-key"];
        apiKey.apiKey = process.env.sib_key;

        const transacEmailApi = new Sib.TransactionalEmailsApi();

        const details = {
          sender: {
            email: "abhivish1011@gmail.com",
            name: "Expense Tracker",
          },
          to: [{ email: userEmail }],
          subject: "Forgot password",
          TextContent: `Your OTP for resetting the password is ${generatedOtp}`,
        };
        transacEmailApi.sendTransacEmail(details);

        let obj = new Otp(userEmail, generatedOtp);
        
        return await obj.insertIntoDatabase();
      }
      if(!user){
        return "no user found"
      }
    } catch (err) {
      return err;
    }
  }
  static async updatePassword(email,password){
    try{

      let user= await users.findOne({where:{
        email:email
      }})

      user.update({
        password:password
      })

    }catch(err){
      return err
    }
    }
    
}
module.exports = { users, Users };
