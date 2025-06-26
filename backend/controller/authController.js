import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js'
import transporter from '../config/nodemailer.js'


export const register = async (req, res) => {
  const {name, email, password} = req.body;
  console.log(name, email, password);
  if(!name || !email || !password) {
    return res.json({success: false, message: 'register controller error'})
  }
  try {
    // 註冊前先檢查是否註冊過
    const userExist = await userModel.findOne({email})


    if(userExist) {
      return res.json({success: false, message: '!User already exist'})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 加密後的 使用者資料 寫入資料庫
    // 需要實例化後處理的複雜情境，可在 save() 前修改實例
    const user = await new userModel({name, email, password: hashedPassword}).save();
    
    // 接收兩個主要部分：payload 和 secret (或私鑰)。 payload 包含要包含在JWT 中的資料，
    // 例如用戶ID、角色等；secret (或私鑰) 用於對JWT 進行簽名，以確保其完整性和真實性
    // JWT 經常用於在客戶端和伺服器之間傳遞身份驗證和授權資訊。 例如，當用戶登錄成功後，
    // 伺服器可以使用 jwt.sign 創建一個JWT，並將其發送給客戶端。 客戶端在後續請求中，將JWT 包含在 Authorization 標頭中，
    // 伺服器可以驗證JWT 的簽名，從而確保用戶的身份，並授予相應的訪問權限。 
    // 第二個參數 ===> 作為密鑰來簽名這個 token 
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });

    // 可以用來儲存使用者的 jwt token ，以便在使用者造訪網站的不同頁面時保持使用者的登入狀態。
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'strict',
      maxAge: 60 * 60 * 1000,
    });
  
    // 我要做一個 歡迎訊息，通知 該筆信件從哪跟寄去哪，要有主題，跟一些描述
    // 發送歡迎郵件
    await transporter.sendMail({
      from: process.env.MAIL_FROM_ADDRESS, 
      to: email,
      subject: "歡迎加入我們的服務！",
      text: `親愛的 ${name}，\n\n感謝您註冊我們的服務！如果有任何問題，請隨時聯絡我們。\n\n祝好，\nMaddison Foo Koch`, 
      html: `<p>親愛的 <b>${name}</b>，</p>
         <p>感謝您註冊我們的服務！如果有任何問題，請隨時聯絡我們。</p>
         <p>祝好，<br/>Maddison Foo Koch</p>`, // HTML 內容
    });


    return res.json({success: true, message: 'User created successfully'})
  } catch (error) {
    return res.json({success: false, message: error.message  })
  }
}
// ...existing code...

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ success: false, message: 'login controller error' });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'strict',
      maxAge: 60 * 60 * 1000,
    });

    return res.json({ success: true, message: 'Login successful' });
  } catch (error) {
    return res.json({ success: false, message: 'Login error' });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'strict',
  });
  return res.json({ success: true, message: 'Logout successful' });
};

// ...existing code...