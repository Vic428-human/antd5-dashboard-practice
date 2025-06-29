// 引入 mongoose 模組
import mongoose from "mongoose";

// 定義用戶資料結構（Schema）
const userSchema = new mongoose.Schema({
  // ====== 註冊會用到 =======
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // OTP 那一串數字字串
  verifyOtp: { type: String, default: '' },

  // OTP 到期時間 
  verifyOtpExpireAt: { type: Number, default: 0 },

  // 確認當前帳號使用者是否已經驗證，如未驗證，則需要進行 OTP 驗證
  isAccountVerified: { type: Boolean, default: false },

  // 重置密碼前，重新發送新的驗證碼
  resetOtp: { type: String, default: '' },

  // 重置密碼前，重新發送新的驗證碼的到期時間
  resetOtpExpireAt: { type: Number, default: 0 },
});

// 將用戶資料結構匯出
// 是否已經存在名為 "user" 的 Model 如果不存在 創建一個
const userModel = mongoose.models.user ||  mongoose.model("user", userSchema);

export default userModel;