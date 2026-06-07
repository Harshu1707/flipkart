const { query } = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

exports.getCart = asyncHandler(async (req, res) => {
  const items = await query('SELECT c.id, c.quantity, p.id product_id, p.name, p.slug, p.price, p.mrp, p.stock, (SELECT url FROM product_images WHERE product_id=p.id ORDER BY is_primary DESC, id LIMIT 1) image FROM cart_items c JOIN products p ON p.id=c.product_id WHERE c.user_id=:userId', { userId: req.user.id });
  res.json({ success: true, data: items });
});
exports.add = asyncHandler(async (req, res) => {
  await query('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (:userId,:product_id,:quantity) ON DUPLICATE KEY UPDATE quantity=quantity+VALUES(quantity)', { userId: req.user.id, product_id: req.body.product_id, quantity: req.body.quantity || 1 });
  res.status(201).json({ success: true });
});
exports.update = asyncHandler(async (req, res) => {
  await query('UPDATE cart_items SET quantity=:quantity WHERE id=:id AND user_id=:userId', { id: req.params.id, userId: req.user.id, quantity: req.body.quantity });
  res.json({ success: true });
});
exports.remove = asyncHandler(async (req, res) => {
  await query('DELETE FROM cart_items WHERE id=:id AND user_id=:userId', { id: req.params.id, userId: req.user.id });
  res.json({ success: true });
});
