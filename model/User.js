const mongoose=require("mongoose")

const userdata= new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    profilePic:{
        type:String,
        default:""
    }
},{timestamps:true})

module.exports=mongoose.model("User",userdata)