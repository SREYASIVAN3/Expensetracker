import express from "express";
import Expense from"../models/Expense.js";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js"; 


const router=express.Router();

router.post("/add-expense",authMiddleware, async (req,res)=>{
    const {title,amount,category,date}=req.body;
    const userReference = req.user.id;

    if(!title||!amount||!category||!date){
        return res.status(400).json({message:"Every fields are required"})
    }

    if(isNaN(amount)||amount<=0){
        return res.status(400).json({message:"Amount should be positive"})
    }
    
    const AllowedCategories=["Food","Travel","Shopping","Rent","Other"]
    if(!AllowedCategories.includes(category)){
        return res.status(400).json({message:"Not in the category"})
    }

    try{
    const newExpense = new Expense({
        title,
        amount,
        category,
        date:date||new Date(),
        userReference:req.user.id
    });

    await newExpense.save();

    res.status(200).json({message:"New expense added successfully"})
}catch(error){
    console.error("Error in Expense Route:", error);
    res.status(500).json({message:"Server error", error: error.message})
}});


router.get("/expenses",authMiddleware,async(req,res)=>{
    console.log(" Expenses API hit!");
    try{
    const userReference=req.user.id;

    const {category,startDate,endDate,page=1,limit=10}=req.query;

    let filter={userReference: userReference};
    if(category){
        filter.category=category;
    }
    if(startDate && endDate){
        filter.date={$gte:new Date(startDate),$lte:new Date(endDate)};
    }

    const expenses=await Expense.find(filter)
    .sort({ date: -1 }) 
    .skip((parseInt(page) - 1) * parseInt(limit)) 
     .limit(parseInt(limit));

    const totalExpenses = await Expense.countDocuments(filter);
    
    const user = await User.findById(userReference).select("name");

     res.status(200).json({ user: user.name, expenses , totalExpenses: totalExpenses });
    }catch (error){
        console.error("Error fetching expenses:", error);
        res.status(500).json({message:"Server error"});
        }
});


router.put("/update-expense/:id",authMiddleware,async(req,res)=>{
   try{
     const id=req.params.id;
     console.log("Expense ID:", id);
    const expense = await Expense.findById(id);
    console.log("Expense Found:", expense);
    if(!expense){
        return res.status(404).json({message:"Expense not found"})
    }

       if( expense.userReference.toString()!==req.user.id){
        return res.status(403).json({ message: "Unauthorized" });
       }
         const{title,amount,category,date}=req.body;
         console.log("Updated Data:", req.body);
         const updatedExpense=await Expense.findByIdAndUpdate(
            id,{title,amount,category,date},
            {new:true, runValidators: true}
         );
         res.status(200).json(updatedExpense);

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Server error" });
    }
    
});


router.delete("/delete-expense/:id",authMiddleware,async(req,res)=>{
    try{
    const id= req.params.id;
    const expense = await Expense.findById(id);
    
    if(!expense){
        return res. status(400).json({message:"Expense not found"})
    }

    if(expense.userReference.toString()!==req.user.id){
        return res. status(403).json({message:"Forbidden"})
    }
    const deleteExpense = await Expense.findByIdAndDelete(id)
    res.status(200).json({message:"Expense deleted"})
}catch(error) {
    res.status(400).json({message:"Cannot delete"})
}
})
export default router;
