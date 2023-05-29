const jwt=require("jsonwebtoken");

module.exports= function jwtVerify(req,res,next){
    const userDetails=jwt.verify(req.headers.authorization,"secret121fs");
   
    if(userDetails){
   

req.userDetails=userDetails;
next();
    }
    else{
    

        return res.json({
            status:"failed"
        })
    }
}
   