import express from "express";
import {
     registerUser,
     loginUser,
     logoutUser,
    } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";



const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/verify", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select("name email phone location role");

    if (!user) {
      return res.status(401).json({
        message: "User account not found.",
      });
    }

    return res.status(200).json({
      message: "Authentication verified successfully.",
      user,
    });
  } catch (error) {
    console.error("Authentication verification error:", error.message);

    return res.status(500).json({
      message: "Failed to verify authentication.",
    });
  }
});



export default router;