const { users, Users } = require("../models/users");

module.exports.forgotPassword = async (req, res, next) => {
  try {
    let result = await Users.forgotPassword(req.body.email);
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
