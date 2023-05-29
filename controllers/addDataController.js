const {Data}=require("../models/expenses")

module.exports.addData= (req,res,next)=>{
    const data=req.body;
    // console.log(req.userDetails.email,req.userDetails.email)
   const expense= new Data(data.expenseItem,data.expensePrice,req.userDetails.userEmail);
   expense.insertIntoDatabase()
   .then((d)=>{
    res.status(200).json({
        status:"succcess",
        data:d
        
    })
   })
   .catch(err=>{
    res.status(404).json({
        status:"failed",
        errorMsg:err
    })
   })
}