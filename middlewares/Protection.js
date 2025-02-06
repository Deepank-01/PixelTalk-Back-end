// jwt token valid
const jwt=require("jsonwebtoken");
const User = require("../model/User");

const protect=async(req,res,next)=>{
    try{
          const token=req.body.token || req.cookies.Token || req.header("Authorization").replace("Bearer ", "")
          if(!token){
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
          }
          const payload=jwt.verify(token,process.env.JWT_TOKEN)
          if(!payload) return res.status(401).json({ message: "Unauthorized - Invalid Token" });
         const user=await User.findById(payload.userId).select("-password")
         if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          req.user=user;
          next()

    }
    catch(err){
      const token=req.body.token || req.cookies.Token || req.header("Authorization").replace("Bearer ", "")
        console.log("Error in protectRoute middleware: ", token);

        res.status(500).json({ message: "Internal server error",sucess:false});
    }
}
module.exports=protect