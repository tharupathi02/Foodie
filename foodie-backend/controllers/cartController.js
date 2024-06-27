import userModel from "../models/userModel.js";

// Add to cart
export const addToCart = async (req, res) => {
  try {
    // Get user data
    let userData = await userModel.findById(req.body.userId);

    // Get cart data
    let cartData = await userData.cartData;

    // Check if item already exists in cart
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    // Update cart data in user model
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: cartData });

    res.status(200).json({ success: true, message: "Item added to cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove from cart
export const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.status(200).json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get cart
export const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res
      .status(200)
      .json({ success: true, message: "Cart data fetched", cartData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default { addToCart, removeFromCart, getCart };
