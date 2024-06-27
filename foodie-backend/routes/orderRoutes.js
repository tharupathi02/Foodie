import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  getAllOrders,
  getUserOrders,
  placeOrder,
  updateOrderStatus,
  verifyOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/placeOrder", authMiddleware, placeOrder);
orderRouter.post("/verifyOrder", verifyOrder);
orderRouter.post("/getOrders", authMiddleware, getUserOrders);
orderRouter.get("/list", getAllOrders);
orderRouter.post("/status", updateOrderStatus)

export default orderRouter;
