import express from "express";
import {
     registerUser,
     loginUser,
     logoutUser,
    } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";



const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/verify", protect, (req,res) =>{
    return res.status(200).json({
        message: "Authentication verified successfully.",
        user: req.user,
    });
});


export default router;