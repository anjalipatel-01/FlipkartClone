const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { asyncHandler } = require('../middlewares/errorHandler');

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
};

const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'name, email and password are required' });
  }

  const { rows: existing } = await db.query(
    'SELECT id FROM users WHERE email = $1',
    [email]
  );
  if (existing.length) {
    return res.status(409).json({ success: false, message: 'Email already in use' });
  }

  const password_hash = await bcrypt.hash(password, 10);

  const { rows } = await db.query(
    `INSERT INTO users (name, email, password_hash, phone)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, phone`,
    [name, email, password_hash, phone || null]
  );
  const user = rows[0];

  const token = signToken({ id: user.id, name: user.name, email: user.email });
  res.cookie('token', token, COOKIE_OPTIONS);

  res.status(201).json({ success: true, data: user });
});

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'email and password are required' });
  }

  const { rows } = await db.query(
    'SELECT id, name, email, phone, password_hash FROM users WHERE email = $1',
    [email]
  );
  if (!rows.length) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  const user = rows[0];
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  const token = signToken({ id: user.id, name: user.name, email: user.email });
  res.cookie('token', token, COOKIE_OPTIONS);

  const { password_hash, ...safeUser } = user;
  res.json({ success: true, data: safeUser });
});

// POST /api/auth/logout
const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Logged out' });
});

// GET /api/auth/me  (protected by verifyToken in router)
const getMe = asyncHandler(async (req, res) => {
  const { rows } = await db.query(
    'SELECT id, name, email, phone, gender, created_at FROM users WHERE id = $1',
    [req.user.id]
  );
  if (!rows.length) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.json({ success: true, data: rows[0] });
});

// PUT /api/auth/me  (protected by verifyToken in router)
const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, gender } = req.body;

  const fields = [];
  const values = [];
  let idx = 1;

  if (name !== undefined) { fields.push(`name = $${idx++}`); values.push(name); }
  if (phone !== undefined) { fields.push(`phone = $${idx++}`); values.push(phone || null); }
  if (gender !== undefined) { fields.push(`gender = $${idx++}`); values.push(gender || null); }

  if (!fields.length) {
    return res.status(400).json({ success: false, message: 'No fields to update' });
  }

  values.push(req.user.id);
  const { rows } = await db.query(
    `UPDATE users SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, name, email, phone, gender, created_at`,
    values
  );

  if (!rows.length) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.json({ success: true, data: rows[0] });
});

module.exports = { register, login, logout, getMe, updateProfile };
