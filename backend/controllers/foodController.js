import foodModel from "../models/foodModel.js";
import fs from 'fs';
import path from 'path';

const addFood = async (req, res) => {
  try {
    // Ensure file is uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    // Extracting file details
    const image_filename = req.file.filename;

    // Create a new food item
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    // Save to database
    await food.save();

    // Success response
    res.json({ success: true, message: "Food added successfully" });
  } catch (error) {
    console.error("Error adding food:", error);

    // Delete the uploaded file if saving to DB fails
    if (req.file) {
      const filePath = path.join('uploads', req.file.filename);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Failed to delete uploaded file:", err);
      });
    }

    // Error response
    res.status(500).json({ success: false, message: "Error adding food" });
  }
};

//all food list
const listFood = async(req,res)=>{
  try {
    const foods = await foodModel.find({});
    res.json({success:true,data:foods})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
  }
}

//remove food item
const removeFood = async(req,res)=>{
  try {
    const food = await foodModel.findById(res.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{})
    await foodModel.findByIdAndDelete(res.body.id);
    res.json({success:true,message:"food removed"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}

export { addFood,listFood,removeFood };
