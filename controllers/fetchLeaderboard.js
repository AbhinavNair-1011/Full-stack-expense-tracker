const {expenses,Data}=require("../models/expenses")

module.exports.fetchLeaderboard=(req,res,next)=>{
Data.fetchLeaderboard()
.then(result=>{

return res.status(200).json({result})
})
.catch(err=>{
    return res.status(404).json({
        status:"failed",
        err:err
    })
})
}