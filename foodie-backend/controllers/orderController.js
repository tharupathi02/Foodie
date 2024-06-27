import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing User Order
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Payment Link
    // line_items is an array of objects, each object representing an item in the order
    const lineItems = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    // Add delivery charges to the order
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    // Create a new session
    // The session object is used to create a payment session for the order.
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_HOST}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${process.env.FRONTEND_HOST}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.status(200).json({ success: true, sessionUrl: session.url });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Verifying User Order
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.status(200).json({ success: true, message: "Payment successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.status(400).json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get User Orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res
      .status(200)
      .json({ success: true, message: "Orders fetched successfully", orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get All Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res
      .status(200)
      .json({ success: true, message: "Orders fetched successfully", orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res
      .status(200)
      .json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  verifyOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
};
