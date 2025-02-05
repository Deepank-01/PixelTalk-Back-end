const express=require("express")
const router=express.Router()

const protect=require("../middlewares/Protection")
const {getsidebar,getmessage,sendmessage}=require("../controllers/Message")
router.get("/user",protect,getsidebar)
router.get("/get/:id",protect,getmessage)
router.post("/send/:id",protect,sendmessage)
module.exports=router