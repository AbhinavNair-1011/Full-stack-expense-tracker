const { json } = require("body-parser");
const {users,Users}=require("../models/users");
const bcrypt=require("bcrypt")

module.exports.validateUser=(req,res,next)=>{
    console.log(req.body.password);
    
   
    Users.validateUser(req.body)
    .then(result=>{
        if(result){
            bcrypt.compare(req.body.password,result.dataValues.password,(err,authorization)=>{
                if(err){
                    return "error"
                }else{
               if(authorization===true){
                return res.status(200).json({

                    status:"successfull",
                    data:result.dataValues.email,
                     user:"found",
                     authentication:true
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