import { register, login, logout, sendOtpVerification } from "../controller/authController.js";
import express from "express";
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/sendOtpVerification", sendOtpVerification);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;