const dummyIsAuthorized = true;
const dummyUserId = "000000";

// export const authMiddleware = (req, res, next) => {
//   if (!dummyIsAuthorized) {
//     return res.status(403).send("Unauthorized");
//   }
//   req.userId = dummyUserId;
//   next();
// };

import jwt from 'jsonwebtoken';


export const authMiddleware = async (req, res, next) => {
   // 確保 req.body 存在，避免後續賦值時出錯
  if (!req.body) {
    req.body = {};
  }
  const { token } = req.cookies || {};

  // 如果沒有 token
  if (!token) {
    return res.status(401).json({ error: '請提供 jwt cookie，請先登入，或是重新註冊帳號' });
  }

  try {
    // 驗證 token，其實就是把先前存的 user._id 轉換成 jwt 後的 token進行解碼
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    // 檢查 token 是否有 id（user._id）
    if(tokenDecode.id){
      req.body.userId = tokenDecode.id
    }else{
      return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }
    next();
  } catch (error) {
    console.error('JWT 驗證錯誤:', error.message);
    return res.status(401).json({ error: '無效的 Token' });
  }
};
