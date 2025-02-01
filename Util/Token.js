const jwt=require("jsonwebtoken")
require("dotenv").config()
const TokenGeneration=(userId,email,fullName,res)=>{
const payload={
    userId:userId,
    email:email,
    fullName:fullName
}
const token=jwt.sign(payload,process.env.JWT_TOKEN,{
    expiresIn:"7d"
})
option={
    expires: new Date(Date.now() + 3*24*60*60*1000),
    httpOnly:true,

}
res.cookie("Token",token,option)
return token
}
module.exports=TokenGeneration