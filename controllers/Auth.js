const User = require("../model/User");
const bcrypt = require('bcrypt');
const TokenGeneration = require("../Util/Token");
const uploadToCloudinary = require("../Util/Cloudnairy");

exports.SignIn=async(req,res)=>{
    try{
        const{email,fullName,password}=req.body;
if(!email || !fullName || !password){
   return res.status(200).json({
    message:"imcomplete in formaltion ",
    email:email,
    password:password,
    fullName:fullName,
    success:false
   })
}
 // serch in the db
 const user=await User.findOne({email})
 if(user){
  return res.status(200).json({
    message:"user already exit",
    success:false
  })
 }

 // entering data in db
 const hash_pas=await bcrypt.hash(password,10);
const obj={
    email,
    fullName,
    password:hash_pas,
}
const newUser=await User.create(obj)
const token=TokenGeneration(newUser._id,newUser.email,newUser.fullName,res)
newUser.password=""
res.status(200).json({
    message:"User enter in the Db",
    token:token,
    User:newUser,
    success:true
})
// end of try
}
catch(err){
    console.log("Error in the singup ")
 return res.status(500).json({
    message:"Error in the Sign-up, Internal serve error ",
    error:err,
    success:false
 })
}

}

exports.Login=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(!email || !password){
            return res.status(200).json({
                email:email,
                password:password,
                message:"incomplete information plese provied the impformation in the response",
                status:"Unscessuful, provide the complete information",
                success:false
            })
        }
        let user=await User.findOne({email})
        if(!user){
            return res.status(200).json({
                message:"User not found in the DB",
                success:false
            })
        }
          // passsword
          const check_pas=await bcrypt.compare(password,user.password)
          if(!check_pas){
            return res.status(200).json({
                message:"Password is incorrect",
                success:false
            })
          }
        // login use the token generation method
        
        const token=TokenGeneration(user._id,user.email,user.fullName,res)
        // user={...user,password:""}
        user.password=""
    
        res.status(200).json({
            message:"Succesfully login",
            token:token,
            userID:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
            User:user,
            success:true
        })
      
    }
    catch(err){
        console.log("Error in login " ,err)
        res.status(500).json({
            message:"Error occur in the code of the login",
            status:false,
            error:err
        })
    }
}

// exports.Logout=async(req,res)=>{

// }

exports.updateProfile=async(req,res)=>{
    try{
        const  profilePic  = req.files.profilePic;
        console.log(`this is the profile pic ${profilePic} and the ${req.files.profilePic}`)
        if (!profilePic) {
            return res.status(200).json({ message: "Profile pic is required",success:false,body:req.body});
          }
          const userId=req.user._id;
          const imageUrl = await uploadToCloudinary(profilePic);
          if(!imageUrl){
            return res.status(200).json({ message: "Profile  in not able to uploaded to cloud",success:false });
          }
          const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: imageUrl }, { new: true });
          if (!updatedUser) {
            return res.status(200).json({ message: "User not found", success: false });
          }

          res.status(200).json({
            message: "Profile picture updated successfully",
            success: true,
            updatedUser
          })
    }
    catch(err){
    console.log("Error in updating the profile photo", err.message)
    return res.status(500).json({
        message:"Error in cloud upload of the  image ",
        success:false,
        error:err.message
    })
    }
}