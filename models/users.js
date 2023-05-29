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
    },
    isPremiumMember:{

        type:Sequelize.BOOLEAN,
        notNull:true
    }
})


class Users{
    constructor(name,email,phoneNumber,password,isPremiumMember){
      this.name=name;
      this.email=email;
      this.phoneNumber=phoneNumber;
      this.password=password;
      this.isPremiumMember=isPremiumMember
    }
    addUser(){
        return users.create({
            name:this.name,
            email:this.email,
            phoneNumber:this.phoneNumber,
            password:this.password,
            isPremiumMember:this.isPremiumMember

        })
    }
    static validateUser(userDetails){
       return users.findOne({
            where:{email:userDetails.email}
        
        })
        
        
    }
    static validateMembership(email){
        return users.findOne({
            where:{email:email}
        
        })
        
    }
 
}

module.exports={users,Users}