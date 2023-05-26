const { json } = require("body-parser");
const {users,Users}=require("../models/users");

module.exports.validateUser=(req,res,next)=>{
    Users.validateUser(req.body)
    .then(result=>{
        if(result){
           
            if(result.dataValues.password===req.body.password){
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