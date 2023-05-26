const {expenses,Data}=require("../models/expenses")

module.exports.updateData=(req,res,next)=>{
    console.log(req.body)
    Data.updateData(req.body)
    .then(result=>{
        res.json({
            status:"success",
            data:result
        })
    })
    .catch(err=>{
        res.json({
            status:"failed",
            errorMsg:err
        })
    
    })
}