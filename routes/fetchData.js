 const express=require("express");
 const router=express.Router();
 const controller=require("../controllers/fetchDataController")

router.get("/api/fetch-data",controller.fetchData);

 module.exports=router;