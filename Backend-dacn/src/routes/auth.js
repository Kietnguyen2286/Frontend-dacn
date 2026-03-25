import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../config/database.js';

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
    connection.release();

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
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
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Register
router.post('/register', async (req, res) => {
  const { username, password, name, role } = req.body;

  if (!username || !password || !name) {
    return res.status(400).json({ message: 'All fields required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const connection = await pool.getConnection();

    await connection.execute(
      'INSERT INTO users (username, password_hash, name, role) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, name, role || 'employee']
    );

    connection.release();
    res.status(201).json({ success: true, message: 'User created' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
