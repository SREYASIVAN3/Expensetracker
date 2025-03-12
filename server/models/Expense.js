import mongoose from "mongoose";
 
const expenseSchema=new mongoose.Schema({
    
    title:{
     type:String,
      required:true
    },
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum:["Food","Travel","Shopping","Rent","Other"]
    },
    date:{
        type:Date,
        default:Date.now
    },
    userReference: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true }

})
    
export default mongoose.model("Expense",expenseSchema)