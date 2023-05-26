const controller=require("../controller/validateUserController");
const router=require("express").Router();

router.post("/api/validate-user",controller.validateUser);

module.exports=router;