const Message = require("../model/Message");
const User = require("../model/User");
const uploadToCloudinary = require("../Util/Cloudnairy");


exports.getsidebar=async(req,res)=>{
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);

    }
    catch(err){
        console.error("Error in getUsersForSidebar: ", err.message);
    res.status(500).json({ error: "Internal server error",success:false });
    }
}
exports.getmessage=async(req,res)=>{
    try{
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
              { senderId: myId, receiverId: userToChatId },
              { senderId: userToChatId, receiverId: myId },
            ],
          });
          res.status(200).json(messages);
      
    }
    catch(err){
        console.log("Error in getMessages controller: ", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.sendmessage=async(req,res)=>{
    try{
        const{text}=req.body
        const{id:receiverId }=req.params
        const senderId=req.user._id
        // const image= req.files.image
        let image_url
        if(req?.files?.image){
            // cloud updload
            console.log("Error inside the for ")
                 let image=req.files.image
                image_url=await uploadToCloudinary(image)
        }
        // push to db
        const data={
            senderId,
            receiverId,
            text,
            image:image_url
        }
        const push_message=await Message.create(data)
        // to do the socket io part 
        res.status(200).json({
            flag:"Send the message",
            success:true,
            message:push_message
        })

    }
    catch(err){
        console.log("Error in sendMessage controller: ", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
}
