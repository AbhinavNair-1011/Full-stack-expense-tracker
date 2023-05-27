const { json } = require("body-parser");
const {users,Users}=require("../models/users");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

module.exports.validateUser=(req,res,next)=>{
    
    
   
    Users.validateUser(req.body)
    .then(result=>{
        if(result){
            bcrypt.compare(req.body.password,result.dataValues.password,(err,authorization)=>{
                if(err){
                    return "error"
                }else{
               if(authorization===true){
                const token=jwt.sign({userName:result.dataValues.name,userEmail:result.dataValues.email},"secret121fs")
                 
                return res.status(200).json({
                    
                    
                    status:"successfull",
                    user:"found",
                    authentication:true,
                    token:token
               
            })
               }else{
                return res.status(200).json({

                    status:"successfull",
                    data:result.dataValues.email,
                     user:"found",
                     authentication:false
                })
               }
            }
            })       
        
            
            
         
        }else{
            return res.status(404).json({
                status:"failed",
                data:result,
                 user:"not found"                
            })
        }
    })
    .catch(err=>console.log(err))
}