let {users,Users}=require("../models/users");

module.exports.addUser=(req,res,next)=>{

let name=req.body.name;
let email=req.body.email;
let phoneNumber=req.body.phoneNumber;
let password=req.body.password;

let user = new Users(name,email,phoneNumber,password);
user.addUser()
.then(result=>{
    res.status(200).json({
        status:"successfull",
        data:result
    })
})
.catch(err=>{
    console.log(err.name , err.errors[0].path)
    if(err.name==="SequelizeUniqueConstraintError"){
        return res.status(409).json({
            status:"user already exists",
            errorName:err.name,
            errorType:err.errors[0].path,
            errorValue:err.errors[0].value
        })
    }else{
        return res.status(404).json({
            status:"failed",
            errorMsg:err
        })
    }
    
})

}