const {expenses,Data}=require("../models/expenses")

module.exports.updateData=(req,res,next)=>{
   
    Data.updateData(req.body)
    .then(result=>{
        res.json({
            status:"success",
            data:[result.expenseItem,result.expensePrice,result.updatedAt]
        })
    })
    .catch(err=>{
        res.json({
            status:"failed",
            errorMsg:err
        })
    
    })
}