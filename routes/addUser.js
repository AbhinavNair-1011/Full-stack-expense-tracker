const controller=require("../controllers/addUserController");
const router=require("express").Router();

router.post("/api/add-user",controller.addUser)

module.exports=router;

