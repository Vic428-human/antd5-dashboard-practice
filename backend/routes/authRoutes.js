import { register,sendOtpVerification, verifyEmail, login, logout,  } from "../controller/authController.js";
import express from "express";
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/sendOtpVerification", sendOtpVerification);
authRouter.post("/verifyEmail", verifyEmail);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;