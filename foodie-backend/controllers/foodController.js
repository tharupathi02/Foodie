import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add Food Item
const addFoodItem = async (req, res) => {
  let image_fileName = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_fileName,
    category: req.body.category,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Item Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get All Food List
const getAllFoodList = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Remove Food Item
const removeFoodItem = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Item Removed Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addFoodItem, getAllFoodList, removeFoodItem };
