import { register, sendOtpVerification, verifyEmail, resendOtp, resetPassword,  login, logout,  } from "../controller/authController.js";
import express from "express";
import { authMiddleware } from "../middleware/auth.js";
const authRouter = express.Router();

// 註冊帳號，當下會在cookies中保存 userId 並且轉換成jwt
authRouter.post("/register", register); 
// 使用者透過cookies中的 userId，然後發送驗證信給這個使用者，此時 user 會收到otp驗證信件
authRouter.post("/sendOtpVerification", authMiddleware, sendOtpVerification);
// 使用者透過cookies中的 userId 跟自己輸入的 otp驗證碼 確認是否為同一個人，如果是代表該信箱帳號驗證通過
authRouter.post("/verifyEmail", authMiddleware, verifyEmail);
// 針對特定email重新發送OTP
authRouter.post("/resendOtp", resendOtp);
// 使用 resendOtp API 之前發送的 OTP 進行重置密碼
authRouter.post("/resetPassword", resetPassword);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;