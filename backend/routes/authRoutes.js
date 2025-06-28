import { register,sendOtpVerification, verifyEmail, login, logout,  } from "../controller/authController.js";
import express from "express";
import { authMiddleware } from "../middleware/auth.js";
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/sendOtpVerification", authMiddleware, sendOtpVerification);
authRouter.post("/verifyEmail", verifyEmail);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;