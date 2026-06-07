const { hashPassword, verifyPassword } = require('../utils/password');
const { query } = require('../config/db');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');
const { signToken } = require('../utils/jwt');

const sanitizeUser = (u) => ({ id: u.id, name: u.name, email: u.email, role: u.role, phone: u.phone, avatarUrl: u.avatar_url });

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  const exists = await query('SELECT id FROM users WHERE email = :email', { email });
  if (exists.length) throw new ApiError(409, 'Email already registered');
  const passwordHash = hashPassword(password);
  const result = await query('INSERT INTO users (name, email, password_hash, phone) VALUES (:name, :email, :passwordHash, :phone)', { name, email, passwordHash, phone: phone || null });
  const user = { id: result.insertId, name, email, role: 'user', phone, avatar_url: null };
  res.status(201).json({ success: true, token: signToken(user), user: sanitizeUser(user) });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const users = await query('SELECT * FROM users WHERE email = :email', { email });
  if (!users.length || !verifyPassword(password, users[0].password_hash)) throw new ApiError(401, 'Invalid credentials');
  if (!users[0].is_active) throw new ApiError(403, 'Account disabled');
  res.json({ success: true, token: signToken(users[0]), user: sanitizeUser(users[0]) });
});

exports.me = asyncHandler(async (req, res) => res.json({ success: true, user: sanitizeUser(req.user) }));
