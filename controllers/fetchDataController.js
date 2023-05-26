const {Data}=require("../models/expenses");

module.exports.fetchData=(req,res,next)=>{
    let email=req.params.email;
    
    // console.log(email)
    Data.fetchAll(email)
    .then((result)=>{
        res.status(200).json({
            status:"success",
            data:{
             result
            }
        })
    })
    .catch(err=>{
        res.status(404).json({
            status:"failed",
            errorMsg:err
        })
    })
}