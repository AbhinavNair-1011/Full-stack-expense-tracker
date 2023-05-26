const {Data}=require("../models/expenses")

module.exports.addData= (req,res,next)=>{
    const data=req.body;
    
   const expense= new Data(data.expenseItem,data.expensePrice,data.email);
   expense.insertIntoDatabase()
   .then((d)=>{
    
    res.status(200).json({
        status:"succcess",
        data:data
        
    })
   })
   .catch(err=>{
    res.status(404).json({
        status:"failed",
        errorMsg:err
    })
   })
}