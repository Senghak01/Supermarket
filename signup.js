const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db');
const router = express.Router();

router.post('/sign_up', async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'username, email, and password are required.',
      });
    }

    const [existingUsers] = await db.query(
      'SELECT id FROM SIGN_UP WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email is already registered.',
      });
    }

    const password_hash = await bcrypt.hash(password, 12);

    const [result] = await db.query(
      `INSERT INTO SIGN_UP (username, email, password_hash, phone)
       VALUES (?, ?, ?, ?)`,
      [username, email, password_hash, phone || null]
    );

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      data: {
        id: result.insertId,
        username,
        email,
      },
    });
  } catch (error) {
    console.error('Sign Up Error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

/* ====================== 
Get All Users 
====================== */
router.get('/sign_up_lists', async (req, res) => {
  try {
    const [users] = await db.query('SELECT * FROM SIGN_UP');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
