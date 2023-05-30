const {expenses,Data}=require("../models/expenses")

module.exports.fetchLeaderboard=(req,res,next)=>{
Data.fetchLeaderboard()
.then(result=>{

res.status(200).json({result})
})
.catch(err=>{
    res.json.status(404).json({
        status:"failed"
    })
})
}