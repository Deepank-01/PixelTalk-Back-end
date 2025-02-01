const express=require("express")
const router=express.Router()

// controller import 
const protect=require("../middlewares/Protection")
const {SignIn,Login,updateProfile}=require("../controllers/Auth")
router.post("/Singin",SignIn)
router.post("/Login",Login)
router.post("/update_profile",protect,updateProfile)


module.exports=router