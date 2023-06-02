const router=require("express").Router();
const controller=require("../controllers/verifyOtp.js")

router.post("/api/verify-otp",controller.verifyOtp);

module.exports=router;