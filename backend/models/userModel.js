// 引入 mongoose 模組
import mongoose from "mongoose";

// 定義用戶資料結構（Schema）
const userSchema = new mongoose.Schema({
  // ====== 註冊會用到 =======
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // 資料驗證 OTP 碼欄位：類型為 String，預設值為空字符串
  verifyOtp: { type: String, default: '' },

  // 資料驗證 OTP 碼過期時間欄位：類型為 Number，預設值為 0
  verifyOtpExpireAt: { type: Number, default: 0 },

  // 帳戶是否已驗證欄位：類型為 Boolean，預設值為 false
  isAccountVerified: { type: Boolean, default: false },

  // 重置密碼 OTP 碼欄位：類型為 String，預設值為空字符串
  resetOtp: { type: String, default: '' },

  // 重置密碼 OTP 碼過期時間欄位：類型為 Number，預設值為 0
  resetOtpExpireAt: { type: Number, default: 0 },
});

// 將用戶資料結構匯出
// 是否已經存在名為 "user" 的 Model 如果不存在 創建一個
const userModel = mongoose.models.user ||  mongoose.model("user", userSchema);

export default userModel;