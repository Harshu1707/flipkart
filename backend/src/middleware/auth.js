const { query } = require('../config/db');
const ApiError = require('../utils/apiError');
const { verifyToken } = require('../utils/jwt');
const asyncHandler = require('../utils/asyncHandler');

const authenticate = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) throw new ApiError(401, 'Authentication token is required');
  const payload = verifyToken(token);
  const users = await query('SELECT id, name, email, role, phone, avatar_url, is_active FROM users WHERE id = :id', { id: payload.id });
  if (!users.length || !users[0].is_active) throw new ApiError(401, 'Invalid or inactive user');
  req.user = users[0];
  next();
});

const authorize = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.user.role)) throw new ApiError(403, 'You are not allowed to perform this action');
  next();
};

module.exports = { authenticate, authorize };
