const sequelize=require("../database/connection");
const Sequelize=require("sequelize");
const {users,Users}=require("./users")

const otp=sequelize.define("otp",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    otp:{
        type:Sequelize.INTEGER,
        notNull:true
    },
    userEmail:{
        type:Sequelize.STRING,
        nutNull:true
    }
});

class Otp{
    constructor(email,otp){
        this.email=email
        this.otp=otp 
    }
    async insertIntoDatabase(){
        let user=await otp.findOne({where:{
            userEmail:this.email
        }})
    
        if(user){
            user.destroy();
            return await otp.create({
                userEmail:this.email,
                 otp:this.otp
     
             });
        }else{
            return await otp.create({
                userEmail:this.email,
                 otp:this.otp
     
             });
        }
    
       
        
    }
    static verifyOtp(userEmail){
       return otp.findOne({where:{
userEmail:userEmail
       }})
    }
}

module.exports={otp,Otp};
