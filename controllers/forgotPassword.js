const { users, Users } = require("../models/users");

module.exports.forgotPassword = async (req, res, next) => {
  try {
    console.log(req.body.email)
    let result = await Users.forgotPassword(req.body.email);
    console.log(result)
    if(result==="no user found"){
        return res.json({
            status:"failed",
            errorMsg:"no user found"
        })
    }else{
        return res.json({ status:"successfull" });

    }
   
  } catch (err) {
    return res.status(404).json(err);
  }
};
