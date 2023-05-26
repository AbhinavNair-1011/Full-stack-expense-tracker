const express=require("express");
const router=express.Router();
const controller=require("../controllers/addDataController")


router.post("/api/add-data",controller.addData)
module.exports=router;