const {users,Users}=require("../models/users");
const  bcrypt=require("bcrypt");


module.exports.updateUserPassword=async(req,res,next)=>{
    let email=req.body.email;
    let password=req.body.password;

    
        try{
            
           let hash= await bcrypt.hash(password,10);

          await Users.updatePassword(email,hash);
          return res.json({status:"successfull"})


        }catch(err){
            return res.json({
                status:"failed",
                errorMsg:err
        })
        }
 }
