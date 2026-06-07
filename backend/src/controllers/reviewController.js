const { query, transaction } = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

exports.create = asyncHandler(async (req, res) => {
  await transaction(async (conn) => {
    await conn.execute('INSERT INTO reviews (user_id, product_id, rating, comment) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE rating=VALUES(rating), comment=VALUES(comment)', [req.user.id, req.params.productId, req.body.rating, req.body.comment || null]);
    await conn.execute('UPDATE products SET rating_avg=(SELECT AVG(rating) FROM reviews WHERE product_id=?), rating_count=(SELECT COUNT(*) FROM reviews WHERE product_id=?) WHERE id=?', [req.params.productId, req.params.productId, req.params.productId]);
  });
  res.status(201).json({ success: true });
});
