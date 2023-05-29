const sequelize=require("../database/connection");
const Sequelize=require("sequelize");
const {users,Users}=require("../models/users")

const payments=sequelize.define("payments",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    orderId:Sequelize.STRING,
    paymentId:Sequelize.STRING,
    paymentSignature:Sequelize.STRING
});

class Payments{
    constructor(orderId,paymentId,paymentSignature){
        this.orderId=orderId;
        this.paymentId=paymentId
        this.paymentSignature=paymentSignature
        
    }
    insertIntoDatabase(userEmail){
        return users.findOne({where:{email:userEmail}})
        .then(user=>{
            let userId=user.dataValues.id;
            let isPremiumMember=user.dataValues.isPremiumMember;
          
           if(!isPremiumMember){
            return payments.create({
                orderId:this.orderId,
                paymentId:this.paymentId,
                paymentSignature:this.paymentSignature,
                userId:userId
    

            })
            .then(responce=>{
                user.update({
                    isPremiumMember:true
                })
            })
        }
        })
      .catch(err=>console.log(err))
    }
}
module.exports={payments,Payments};