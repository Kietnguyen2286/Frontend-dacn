import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import pool from '../config/database.js';

const router = express.Router();

// Setup email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Generate verification token
const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Send verification email
const sendVerificationEmail = async (email, token, name) => {
  const verificationLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${token}&email=${email}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER || 'your-email@gmail.com',
    to: email,
    subject: 'Xác nhận tài khoản - Hệ thống Quản lý Nhân viên',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Xác nhận tài khoản</h2>
        <p>Xin chào ${name},</p>
        <p>Cảm ơn bạn đã đăng ký tài khoản. Vui lòng nhấp vào nút dưới đây để xác nhận email của bạn:</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${verificationLink}" style="background-color: #4f46e5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Xác nhận Email
          </a>
        </p>
        <p>Hoặc sao chép liên kết này vào trình duyệt của bạn:</p>
        <p style="word-break: break-all; color: #666;">${verificationLink}</p>
        <p>Liên kết này sẽ hết hạn sau 24 giờ.</p>
        <p>Nếu bạn không tạo tài khoản này, vui lòng bỏ qua email này.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #999; font-size: 12px;">Hệ thống Quản lý Nhân viên</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Detailed validation
  if (!username && !password) {
    return res.status(400).json({ message: 'Vui lòng nhập tên đăng nhập và mật khẩu' });
  }
  if (!username) {
    return res.status(400).json({ message: 'Vui lòng nhập tên đăng nhập' });
  }
  if (!password) {
    return res.status(400).json({ message: 'Vui lòng nhập mật khẩu' });
  }

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
    connection.release();

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Tên đăng nhập không tồn tại' });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Mật khẩu không chính xác' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ: ' + error.message });
  }
});

// Register
router.post('/register', async (req, res) => {
  const { username, password, name, email, role } = req.body;

  // Validation
  if (!username || !password || !name || !email) {
    return res.status(400).json({ 
      success: false,
      message: 'Vui lòng nhập đủ các thông tin: tên đăng nhập, mật khẩu, họ tên và email' 
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false,
      message: 'Email không hợp lệ' 
    });
  }

  try {
    const connection = await pool.getConnection();
    
    // Check if username already exists
    const [existingUsername] = await connection.execute(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );
    
    if (existingUsername.length > 0) {
      connection.release();
      return res.status(400).json({ 
        success: false,
        message: 'Tên đăng nhập đã tồn tại' 
      });
    }

    // Check if email already exists
    const [existingEmail] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    
    if (existingEmail.length > 0) {
      connection.release();
      return res.status(400).json({ 
        success: false,
        message: 'Email đã được sử dụng' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();

    // Insert user with unverified email
    await connection.execute(
      'INSERT INTO users (username, password_hash, name, email, verification_token, role, email_verified) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [username, hashedPassword, name, email, verificationToken, role || 'employee', false]
    );

    connection.release();

    // Send verification email
    const emailSent = await sendVerificationEmail(email, verificationToken, name);

    if (emailSent) {
      res.status(201).json({ 
        success: true, 
        message: 'Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.',
        email: email 
      });
    } else {
      res.status(201).json({ 
        success: true, 
        message: 'Đăng ký thành công! Email xác nhận sẽ được gửi sau vài phút.',
        email: email,
        warning: 'Email service may be temporarily unavailable'
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Lỗi đăng ký: ' + error.message 
    });
  }
});

// Verify Email
router.post('/verify-email', async (req, res) => {
  const { token, email } = req.body;

  if (!token || !email) {
    return res.status(400).json({ 
      success: false,
      message: 'Token và email là bắt buộc' 
    });
  }

  try {
    const connection = await pool.getConnection();
    
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE email = ? AND verification_token = ?',
      [email, token]
    );

    if (rows.length === 0) {
      connection.release();
      return res.status(400).json({ 
        success: false,
        message: 'Token không hợp lệ hoặc đã hết hạn' 
      });
    }

    // Update user to mark email as verified
    await connection.execute(
      'UPDATE users SET email_verified = true, verification_token = NULL WHERE email = ?',
      [email]
    );

    connection.release();

    res.json({ 
      success: true, 
      message: 'Email đã được xác nhận thành công. Bạn có thể đăng nhập ngay bây giờ.' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Lỗi xác nhận email: ' + error.message 
    });
  }
});

// Resend verification email
router.post('/resend-verification', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ 
      success: false,
      message: 'Email là bắt buộc' 
    });
  }

  try {
    const connection = await pool.getConnection();
    
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      connection.release();
      return res.status(400).json({ 
        success: false,
        message: 'Email không được tìm thấy' 
      });
    }

    const user = rows[0];
    
    if (user.email_verified) {
      connection.release();
      return res.status(400).json({ 
        success: false,
        message: 'Email đã được xác nhận' 
      });
    }

    // Generate new token
    const newToken = generateVerificationToken();
    
    await connection.execute(
      'UPDATE users SET verification_token = ? WHERE email = ?',
      [newToken, email]
    );

    connection.release();

    // Send verification email
    const emailSent = await sendVerificationEmail(email, newToken, user.name);

    if (emailSent) {
      res.json({ 
        success: true, 
        message: 'Email xác nhận đã được gửi lại' 
      });
    } else {
      res.json({ 
        success: true, 
        message: 'Email xác nhận sẽ được gửi sau vài phút',
        warning: 'Email service may be temporarily unavailable'
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Lỗi: ' + error.message 
    });
  }
});

export default router;
