const { query } = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

exports.analytics = asyncHandler(async (_req, res) => {
  const [users, products, orders, revenue, lowStock] = await Promise.all([
    query('SELECT COUNT(*) total FROM users'),
    query('SELECT COUNT(*) total FROM products WHERE is_active=1'),
    query('SELECT COUNT(*) total FROM orders'),
    query("SELECT COALESCE(SUM(total_amount),0) total FROM orders WHERE payment_status IN ('paid','pending')"),
    query('SELECT id,name,stock FROM products WHERE stock <= 10 AND is_active=1 ORDER BY stock ASC LIMIT 8')
  ]);
  res.json({ success: true, data: { users: users[0].total, products: products[0].total, orders: orders[0].total, revenue: revenue[0].total, lowStock } });
});
