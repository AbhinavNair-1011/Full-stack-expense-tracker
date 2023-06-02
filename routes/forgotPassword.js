const router=require("express").Router();
const controller=require("../controllers/forgotPassword");

router.post("/api/forgot-password",controller.forgotPassword);


module.exports=router;