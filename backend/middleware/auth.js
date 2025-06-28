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
  const { token } = req.cookies || {};
   // 如果兩種方式都沒有 token
  if (!token) {
    return res.status(401).json({ error: '請提供 Authorization header 或 jwt cookie' });
  }
  try {
    // 驗證 token，其實就是把先前存的 user._id 轉換成 jwt 後的 token進行解碼
   const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if(tokenDecode.id){
      // 在設置屬性前，先檢查對象是否存在
    if (!req.body) req.body = {}; // 不設這行 =>  Cannot set properties of undefined (setting 'userId')
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
