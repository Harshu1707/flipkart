const { query } = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

exports.list = asyncHandler(async (req, res) => {
  const data = await query('SELECT w.id, p.id product_id, p.name, p.slug, p.price, p.mrp, (SELECT url FROM product_images WHERE product_id=p.id ORDER BY is_primary DESC, id LIMIT 1) image FROM wishlist_items w JOIN products p ON p.id=w.product_id WHERE w.user_id=:userId', { userId: req.user.id });
  res.json({ success: true, data });
});
exports.add = asyncHandler(async (req, res) => {
  await query('INSERT IGNORE INTO wishlist_items (user_id, product_id) VALUES (:userId,:product_id)', { userId: req.user.id, product_id: req.body.product_id });
  res.status(201).json({ success: true });
});
exports.remove = asyncHandler(async (req, res) => {
  await query('DELETE FROM wishlist_items WHERE product_id=:productId AND user_id=:userId', { productId: req.params.productId, userId: req.user.id });
  res.json({ success: true });
});
