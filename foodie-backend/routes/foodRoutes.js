import express from "express";
import { addFoodItem, getAllFoodList, removeFoodItem } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callBack) => {
    return callBack(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// Food Routes
foodRouter.post("/add", upload.single("image"), addFoodItem); // Add Food Item
foodRouter.get("/getFoodList", getAllFoodList); // Get All Food List
foodRouter.post("/remove", removeFoodItem); // Remove Food Item

export default foodRouter;
