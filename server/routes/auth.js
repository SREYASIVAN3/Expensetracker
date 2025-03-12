import express from "express";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {body,validationResult} from "express-validator";
import User from "../models/User.js";


const router=express.Router();


//Post
router.post("/signup",
    [
        body("name").isLength({min:3}).withMessage("Name must be atleast 3 characters"),
        body("email").isEmail().withMessage("Invalid email format"),
        body("password").isLength({min:8}).withMessage("atleast 8 characters minimum ")
    ],
    async (req,res)=>{
        const error=validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({errors:error.array()});
        }
        const {name,email,password}= req.body;
        if(!name||!email||!password){
            return res.status(400).json({message:"All fields are required"})
        }
    
        try{
            const existingUser= await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User already exist"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);
        console.log("Signup - Plain Password:", password);
        console.log("Hashed Password Before Storing:", hashedPassword);
        const newUser=new User({
            name,email,password:hashedPassword
        });
        
        await newUser.save();
        const token = jsonwebtoken.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(201).json({message:"User has been registered" ,token, user: { name: newUser.name }})
    } catch(error){
        console.error("Signup Error:", error);
        res.status(500).json({message:"Server error"});
    }
});

router.post("/login",
    [
    
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({min:8}).withMessage("atleast 8 characters minimum ")
    ],
    async (req,res)=>{
      const error=validationResult(req);
        if(!error.isEmpty()){
             return res.status(400).json({errors:error.array()});
        }
    
        const {email,password}=req.body;
        try {
            const user=await User.findOne({email})
            console.log(email,user);
            if(!user){
                return res.status(401).json({message:"Invalid credentials"})
            }
            console.log("Entered Password:", password);
            console.log("Hashed Password:", user.password);
            const isMatch = await bcrypt.compare(password,user.password);
            
            console.log("Password Match:", isMatch);
            if(!isMatch){
                return res.status(400).json({message:"Invalid credentials"})
            }
            console.log("JWT_SECRET:", process.env.JWT_SECRET);
             const token= jsonwebtoken.sign(
                {id:user._id}, process.env.JWT_SECRET,
                {expiresIn:"24h"}
             );

             res.status(200).json({message:"Login successful",token, user: { name: user.name }});

        } catch (error) {
            res.status(500).json({message:"Server error"})
        }

    
 
})
    
   
   

                                       

export default router;