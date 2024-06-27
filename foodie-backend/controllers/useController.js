import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email is already registered
    const user = await userModel.findOne({ email });

    // If user not found
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exists" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Credentials" });
    }

    // Creating JWT Token
    const token = createToken(user._id);

    // Sending Response
    res.status(200).json({
      success: true,
      message: "User Logged In Successfully, Welcome Back!",
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {}
};

// Create Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if email is already registered
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Validating Email format and strong password
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter strong password. Password should be atleast 8 characters long",
      });
    }

    // Hashing User Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating User
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // Saving User
    const user = await newUser.save();
    // Creating JWT Token
    const token = createToken(user._id);

    // Sending Response
    res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser };
