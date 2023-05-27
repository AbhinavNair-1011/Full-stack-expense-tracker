const {Data}=require("../models/expenses");

module.exports.deleteData=(req,res,next)=>{
   
 let name=req.params.itemName;
 let email= req.params.email;

 Data.deleteFromDatabase(name,email)
 .then((toBeDeleted)=>{
    if(toBeDeleted){
    toBeDeleted.destroy()
    return res.status(200).json({
        status:"success",
       })
    }
    else{
       return res.status(404).json({
            status:"failed",
            errorMsg:"does not exits"
        })
    }

 })
 .catch(err=>{
    return res.status(404).json({
        status:"failed",
        errorMsg:err+"does not exists"
    })
 })
}