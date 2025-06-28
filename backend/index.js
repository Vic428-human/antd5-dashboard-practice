import express from "express";
import cors from "cors";
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import {testAPI, logAnalytics } from "./db.js";
import { authMiddleware } from "./middleware/auth.js";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js' 

const app = express();

const port = process.env.PORT || 4000
connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser()); // Use without secret for unsigned cookies

// ==== api endpoint 集中在這 ====
app.get('/',  (req, res) => {
  res.send('api working!')
})
// 使用 auth 相關
app.use('/api/auth',authRouter)


// endpoint 單一測試
app.post("/order", authMiddleware, async (req, res) => {
  // 分別取得傳進來的 body requet 對應的 key value
  const { test } = req.body;
  if (!test) {
    return res.status(400).json({ message: "test is required" });
  }
  const message = await testAPI({ test });
  await logAnalytics({ test }, "testAPI successful!!!");
  // const orderId = await createOrder(cart, userId);
  // await logAnalytics({ orderId, userId }, "Order created");
  // const emailResult = await sendEmail(orderId, userId);
  // await logAnalytics({ orderId, userId, emailResult }, "Email sent");

  return res.json({ message });
});

app.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err.message);
});



app.listen(port, () => {
  console.log(`伺服器連線中 ${port}`);
});
