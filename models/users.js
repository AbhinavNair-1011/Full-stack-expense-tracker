const sequelize=require("../database/connection");
const Sequelize=require("sequelize")

const users=sequelize.define("users",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        notNull:true
    },
    email:{
        type:Sequelize.STRING,
        notNull:true,
        unique:true
    },
    phoneNumber:{
        type:Sequelize.BIGINT,
        notNull:true,
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        notNull:true
    }
})


class Users{
    constructor(name,email,phoneNumber,password){
      this.name=name;
      this.email=email;
      this.phoneNumber=phoneNumber;
      this.password=password;
    }
    addUser(){
        return users.create({
            name:this.name,
            email:this.email,
            phoneNumber:this.phoneNumber,
            password:this.password

        })
    }
    static validateUser(userDetails){
       return users.findOne({
            where:{email:userDetails.email}
        
        })
        
        
    }
 
}

module.exports={users,Users}