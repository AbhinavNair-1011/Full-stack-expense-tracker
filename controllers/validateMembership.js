const {users,Users}=require("../models/users")
const jwt=require("jsonwebtoken")


module.exports.validateMembership=(req,res,next)=>{

    let email=req.userDetails.userEmail;

    Users.validateMembership(email)
    .then(result=>{
        if(result.dataValues.isPremiumMember){
        return res.json({
            status:"successfull",
            isPremiumMember:true
            
        })
    }else{
        return res.json({
            status:"successfull",
            isPremiumMember:false
            
        })
    }
    })
    .catch(err=>console.log(err))



}