import userModel from '../models/userModel.js'; // 請替換為實際路徑
import mongoose from 'mongoose';

export const getUserById = async (req, res) => {
  // 預設 userId 假資料 6861032d3da7163e025d7acf 可以從DB直接找，但這邊為了測試方便
  const userId = (req.body && req.body.userId) ? req.body.userId : '6861032d3da7163e025d7acf'; // 安全地獲取 userId

  // 基本欄位檢查
  if (!userId) {
    return res.status(400).json({ success: false, message: '缺少 userId 參數' });
  }

  try {
    // 驗證 userId 是否為有效的 MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: '無效的用戶 ID 格式' });
    }

    // 查找使用者
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: '找不到該使用者' });
    }

    // 返回用戶資訊 (排除敏感資訊)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      isAccountVerified: user.isAccountVerified
    };

    return res.json({ 
      success: true, 
      data: userData 
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};