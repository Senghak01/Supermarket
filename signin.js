const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');

const router = express.Router();

/* ====================== 
Sign IN 
====================== */
router.post('/sign_in', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const [users] = await db.query('SELECT * FROM SIGN_UP WHERE email = ?', [
      email,
    ]);

    const user = users[0];
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const deviceInfo = req.headers['user-agent'] || 'unknown';

    const isValid = user && (await bcrypt.compare(password, user.password_hash));

    await db.query(
      `INSERT INTO SIGN_IN (user_id, ip_address, device_info, status)
       VALUES (?, ?, ?, ?)`,
      [user?.id || null, ipAddress, deviceInfo, isValid ? 'success' : 'failed']
    );

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: 'Account is disabled. Please contact support.',
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      success: true,
      message: 'Signed in successfully.',
      token,
      data: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Sign In Error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});



module.exports = router;