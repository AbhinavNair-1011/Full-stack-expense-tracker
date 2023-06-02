const { otp, Otp } = require("../models/otp");

module.exports.verifyOtp = async (req, res, next) => {
  
  try {
    let email = req.body.email;
    let userOtp = Number(req.body.otp);

    let result = await Otp.verifyOtp(email);

    let generatedOtp = result.dataValues.otp;
    

    if (generatedOtp === userOtp) {
        await result.destroy();

     return  res.status(200).json({
        status:"successfull"
      });
    
    } else {
      
      return res.json({
        status:"failed"
      })
    }
  } catch (err) {
    await result.destroy();
    return res.status(404).json({
        staus:"failed",
        errorMsg:err
    })
  }
};
