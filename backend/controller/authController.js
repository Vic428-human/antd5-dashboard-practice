import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js'
import transporter from '../config/nodemailer.js'

// STEP 1:註冊後，資料庫會多一筆 user 資訊，會有各自對應的 _id => userId
export const register = async (req, res) => {
  const {name, email, password} = req.body;
  if(!name || !email || !password) {
    return res.json({success: false, message: 'register controller error'})
  }
  try {
    // 註冊前先檢查是否註冊過
    const userExist = await userModel.findOne({email})

    if(userExist) {
      return res.json({success: false, message: '該信箱帳號已經註冊過'})
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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    // 可以用來儲存使用者的 jwt token ，以便在使用者造訪網站的不同頁面時保持使用者的登入狀態。
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1週
    });
  
    // 我要做一個 歡迎訊息，通知 該筆信件從哪跟寄去哪，要有主題，跟一些描述
    // 發送歡迎郵件
    // await transporter.sendMail({
    //   from: process.env.MAIL_FROM_ADDRESS, 
    //   to: email,
    //   subject: "歡迎加入我們的服務！",
    //   text: `親愛的 ${name}，\n\n感謝您註冊我們的服務！如果有任何問題，請隨時聯絡我們。\n\n祝好，\nMaddison Foo Koch`, 
    //   html: `<p>親愛的 <b>${name}</b>，</p>
    //      <p>感謝您註冊我們的服務！如果有任何問題，請隨時聯絡我們。</p>
    //      <p>祝好，<br/>Maddison Foo Koch</p>`, // HTML 內容
    // });

    return res.json({success: true, message: '註冊成功，請透過驗證信件驗證帳號' })
  } catch (error) {
    return res.json({success: false, message: error.message  })
  }
}

// STEP 2: 發送 OTP 驗證信：假設剛註冊完需要驗證帳號，會發送一組OTP到信箱
export const sendOtpVerification = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
        return res.status(400).json({ success: false, message: '缺少 userId' });
  }
  try {
    const user = await userModel.findById(userId);
    if (!user) {
        return res.status(404).json({ success: false, message: '找不到該使用者' });
    }
    // 如果已經驗證過，可以選擇不發送 OTP
    if (user.isAccountVerified) {
        return res.status(200).json({ success: true, message: '帳號已驗證過' });
    }
    const now = new Date(); // 獲取當前時間
    const expiriedAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 加上 24 小時
    const otp = generateOtp();
    
    // 更新用戶資料
    user.verifyOtpExpireAt = expiriedAt;
    user.verifyOtp = otp;
    await user.save(); // 確保 OTP 和過期時間已經儲存到資料庫

    // 發送 OTP 到信箱
    const mailOptions = {
        from: process.env.MAIL_FROM_ADDRESS,
        to: user.email,
        subject: 'OTP 驗證碼 - 請完成信箱驗證',
        html: `<p>親愛的 <b>${user.name}</b>，</p>
        <p>您的 OTP 為：<b>${otp}</b>，請於24小時內完成驗證。</p>
        <p>如有任何問題請聯繫客服</p>
        <p>客服電話：000-000-000</p>`,
    };
    
    await transporter.sendMail(mailOptions);

    return res.json({success: true, message: 'OTP 已發送到您的信箱'})
  } catch (error) {
    return res.json({success: false, message: error.message  })
  }
}

// STEP 3:信箱拿到OTP後，對剛才註冊的信箱做驗證
export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
        return res.status(400).json({ success: false, message: '缺少 userId 或 otp' });
  }
  try {
    const user = await userModel.findById(userId);  
    // 驗證順序由範圍大到小，由重要程度大到小檢查verifyOtp
    if (!user) {
        return res.status(404).json({ success: false, message: '找不到該使用者' });
    }

    if (user.verifyOtp !== otp || !user.verifyOtp) {
        return res.status(400).json({ success: false, message: '驗證碼錯誤' });
    } 

    if (user.verifyOtpExpireAt < Date.now()) {
        return res.status(400).json({ success: false, message: '驗證碼已過期' });
    }

    // 驗證成功的話，就把過期時間和驗證碼清空
    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpireAt = '';
    await user.save();

    return res.json({success: true, message: '帳號驗證成功'})

  } catch (error) {
    return res.json({success: false, message: error.message  })
  }
}

// STEP 4: 針對特定email重新發送OTP
export const resendOtp = async (req, res) => {
  const { email } = req.body; // 不能用 email 去查詢當前user Cast to ObjectId failed for value \"z0983195379a@gmail.com\" (type string) at path \"_id\" for model \"user\"
  if (!email) {
    return res.status(400).json({ success: false, message: '缺少 email' });
  }
  try {
    const user = await userModel.findOne({email});
    if (!user) {
      return res.status(404).json({ success: false, message: '找不到該使用者' });
    }

    // 計算新的過期時間
    const now = new Date();
    const expiriedAt = new Date(now.getTime() + 5 * 60 * 1000); 
    user.resetOtpExpireAt = expiriedAt;

    const resendOtp = generateOtp();
    user.resetOtp = resendOtp;

    await user.save();

    // 發送OTP郵件，OTP只會發送到這個email
    const mailOptions = {
      from: process.env.MAIL_FROM_ADDRESS,
      to: user.email,
      subject: '重置的 OTP 驗證碼已發送  - 請盡快更新你的當前信箱的密碼',
      html: `<p>親愛的 <b>${user.name}</b>，</p>
        <p>重置的 OTP 為：<b>${resendOtp}</b>，請於5分鐘內完成驗證。</p>
        <p>如有任何問題請聯繫客服</p>
        <p>客服電話：000-000-000</p>`,
    };
    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: 'OTP 已重新發送到您的信箱' });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// STEP 5: 使用 resendOtp 之前發送的 OTP 進行重置密碼
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  // 基本欄位檢查
  if (!email || !otp || !newPassword) {
    return res.status(400).json({ success: false, message: '缺少參數' });
  }

  try {
    // 查找使用者
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: '找不到該使用者' });
    }

    // 檢查 OTP 是否正確
    if (user.resetOtp !== otp) {
      return res.status(400).json({ success: false, message: 'OTP 驗證碼錯誤' });
    }

    // 檢查 OTP 是否過期
    const now = new Date();
    if (!user.resetOtpExpireAt || user.resetOtpExpireAt < now) {
      return res.status(400).json({ success: false, message: 'OTP 已過期，請重新申請' });
    }

    // 密碼加密（建議使用 bcrypt）
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 更新密碼，清空 OTP
    user.password = hashedPassword;
    user.resetOtp = '';
    user.resetOtpExpireAt = '';
    await user.save();

    return res.json({ success: true, message: '密碼已成功重置' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1週
    });

    return res.json({ success: true, message: 'Login successful' });
  } catch (error) {
    return res.json({ success: false, message: 'Login error' });
  }
};

export const logout = (req, res) => {
  console.log('logout');
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'strict',
  });
  return res.json({ success: true, message: 'Logout successful' });
};

// OTP 產生器
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}