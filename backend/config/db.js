import mongoose from "mongoose";

export const connectDB = async()=>{
  await mongoose.connect('mongodb+srv://arunabhaa:23070122049@cluster0.66tqt.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}

