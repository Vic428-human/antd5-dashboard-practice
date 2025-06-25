import express from "express";
import cors from "cors";
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import {testAPI, logAnalytics } from "./db.js";
import { authMiddleware } from "./middleware/auth.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser()); // Use without secret for unsigned cookies

app.get('/',  (req, res) => {
  res.send('api working!')
})

app.post("/order", authMiddleware, async (req, res) => {
  const { cart } = req.body;
  const userId = req.userId;
  const message = await testAPI('test');
  await logAnalytics({ cart, userId }, "testAPI successful");
  // const orderId = await createOrder(cart, userId);
  // await logAnalytics({ orderId, userId }, "Order created");
  // const emailResult = await sendEmail(orderId, userId);
  // await logAnalytics({ orderId, userId, emailResult }, "Email sent");

  return res.json({ message });
});

app.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err.message);
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
