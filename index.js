
const express=require("express")
var cookieParser = require('cookie-parser')
const dbconnect=require("./database/Dbconnect")
const {cloudinaryConnect}=require("./database/Cloudnairy_config")
const fileUpload=require("express-fileupload")
const cors=require("cors")
// const app=express()
const PORT=process.env.PORT || 5000
// import
require('dotenv').config()
const{app,server}=require("./Util/server")
const auth=require("./routes/auth")
const message=require("./routes/Message")
// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// app.use(cors({
//     origin: 'http://localhost:4000',
//     credentials: true, // Enable credentials
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     exposedHeaders: ['set-cookie']
// }));

// mounting 
app.use("/api/auth",auth)  
app.use("/api/message",message)

// Db connect 
dbconnect()
// cloudnairy connect 
cloudinaryConnect()
server.listen(PORT,()=>console.log(`Backed runnig on port ${PORT}`))