// mongodb://localhost:27017/client
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const MONGO_URI=process.env.CONNECTION_STRING

const connection = mongoose.connect(`${MONGO_URI}`).then(() =>{
    console.log("Database connected successfully!");
})
.catch((err)=>{
    console.error("ERROR WHILE CONNECTING TO DB: ",err);
    
})

export default connection