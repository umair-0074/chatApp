import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "No User Found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middlewatr", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
