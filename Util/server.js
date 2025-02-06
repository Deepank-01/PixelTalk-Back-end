// this is the ion server 
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app=express()

const onlineUser={}
//server for io conncetion
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "https://pixeltalk-front-end-deepank.vercel.app", // Allow all origins (adjust for security)
      methods: ["GET", "POST"],
    },
  });

  io.on("connection",(socket)=>{

    /// connected the user 
    console.log("The socket connected with id" , socket.id)
    // input send from the user at the login time and singup time 
   console.log( socket.handshake.query.userId)
   const userId = socket.handshake.query.userId;
   if(userId) onlineUser[userId]=socket.id;
   //io.emit(XYZ) will emit the message from the name XYZ to the sockets 
   io.emit("getOnlineUsers", Object.keys(onlineUser));
     console.log(onlineUser)
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        delete onlineUser[userId];
        console.log(onlineUser)
        io.emit("getOnlineUsers", Object.keys(onlineUser));
      });
    
  })

  const getOnlineuser_id=(id)=>{
    // used to get the socket id of the online users
       return onlineUser[id]
  } 


  module.exports= {app,server,getOnlineuser_id,io}