import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// API Endpoints
app.use("/api/uploads", express.static("uploads")); // Get Image from uploads folder
app.use("/api/food", foodRouter); // Food Routes
app.use("/api/users", userRouter); // User Routes
app.use("/api/cart", cartRouter); // Cart Routes
app.use("/api/order", orderRouter); // Order Routes

app.get("/", (req, res) => {
  res.send("Hello Foodie! 🍔 Backend is Running");
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
