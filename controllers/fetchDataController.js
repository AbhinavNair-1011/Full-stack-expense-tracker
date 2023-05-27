const {Data}=require("../models/expenses");
const jwt=require("jsonwebtoken");



module.exports.fetchData=(req,res,next)=>{

    
   const userDetails=jwt.verify(req.headers.authorization,"secret121fs");
   
    Data.fetchAll(userDetails.userEmail)
    .then((result)=>{
        
        res.status(200).json({
            status:"success",
            data:{
             result
            },
            email:userDetails.userEmail,
            name:userDetails.userName
        })
    })
    .catch(err=>{
        res.status(404).json({
            status:"failed",
            errorMsg:err
        })
    })
}