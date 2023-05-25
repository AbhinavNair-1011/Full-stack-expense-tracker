const controller=require("../controller/addUserController");
const router=require("express").Router();

router.post("/api/add-user",controller.addUser)

module.exports=router;

