const { query } = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

exports.profile = asyncHandler(async (req, res) => res.json({ success: true, data: req.user }));
exports.updateProfile = asyncHandler(async (req, res) => {
  await query('UPDATE users SET name=COALESCE(:name,name), phone=COALESCE(:phone,phone), avatar_url=COALESCE(:avatar_url,avatar_url) WHERE id=:id', { id: req.user.id, name: req.body.name, phone: req.body.phone, avatar_url: req.body.avatar_url });
  res.json({ success: true });
});
exports.list = asyncHandler(async (_req, res) => {
  const data = await query('SELECT id,name,email,phone,role,is_active,created_at FROM users ORDER BY created_at DESC');
  res.json({ success: true, data });
});
exports.update = asyncHandler(async (req, res) => {
  await query('UPDATE users SET role=COALESCE(:role,role), is_active=COALESCE(:is_active,is_active) WHERE id=:id', { id: req.params.id, role: req.body.role, is_active: req.body.is_active });
  res.json({ success: true });
});
