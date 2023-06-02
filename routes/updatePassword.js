const router=require("express").Router();
const controller=require("../controllers/updateUserPassword");

router.post("/api/update-password",controller.updateUserPassword)

module.exports=router;