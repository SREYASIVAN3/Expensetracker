import mongoose from "mongoose";
import cors from "cors";
import express from"express";
import AuthRoutes from "./routes/auth.js";
import ExpenseRoutes from "./routes/expense.js"; 

import dotenv from"dotenv";




dotenv.config();

const app=express();
  



app.use(express.json())
app.use(cors())

app.use("/api/auth",AuthRoutes);
app.use("/api",  ExpenseRoutes)
app.use("/api/expense",  ExpenseRoutes)

mongoose
        .connect(process.env.DB)
        .then(()=>{
            console.log("Database connected");
        app.listen(process.env.PORT || 8080,()=>{
            console.log(`Server running on port ${process.env.PORT || 8080}`);
        });
    })
    .catch((error) => console.log("Database connection error:", error));