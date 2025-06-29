import { getUserById } from "../controller/userController.js";
import express from "express";
import { authMiddleware } from "../middleware/auth.js";
const userRouter = express.Router();

userRouter.get('/users', authMiddleware, getUserById);

export default userRouter;