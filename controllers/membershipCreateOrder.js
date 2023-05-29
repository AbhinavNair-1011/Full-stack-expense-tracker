const Razorpay=require("razorpay");
const dotenv=require("dotenv").config();


module.exports.createOrder= (req,res,next)=>{
    let secret={
        key_id:process.env.key_id,
        key_secret:process.env.key_secret
    }
    let rzp=new Razorpay(secret);
    
    let details={
        amount:2500,
        currency:"INR"
    }

    rzp.orders.create(details)
    .then((order)=>{
      
          return  res.status(201).json({
                status:"succes",
                order_id:order.id,
                key_id:rzp.key_id
            })
        
    })
    .catch(err=> res.status(404).json({
        status:"failed",
        err
    }))


    


}