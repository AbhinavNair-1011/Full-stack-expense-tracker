const express=require("express");
const router=express.Router();
const controller=require("../controllers/updateDataController")

router.patch("/api/update-data",controller.updateData)

module.exports=router;