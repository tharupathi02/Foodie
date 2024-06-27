import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  // Get token from headers
  const { token } = req.headers;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized Access" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = tokenDecode.id;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authMiddleware;
