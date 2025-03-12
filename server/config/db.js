import mongoose from "mongoose";
import dotenv from  "dotenv";

dotenv.config();

mongoose.connect(process.env.DB)
    .then(()=>console.log("Connected to DB"))
    .catch((error)=>console.log("Cannot connect to DB"))