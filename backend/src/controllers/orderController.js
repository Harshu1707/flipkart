const crypto = require('crypto');
const razorpay = require('../config/razorpay');
const { query, transaction } = require('../config/db');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');
const { razorpay: razorpayEnv } = require('../config/env');

exports.createRazorpayOrder = asyncHandler(async (req, res) => {
  if (!razorpay) throw new ApiError(503, 'Razorpay is not configured');
  const order = await razorpay.orders.create({ amount: Math.round(Number(req.body.amount) * 100), currency: 'INR', receipt: `rcpt_${Date.now()}` });
  res.json({ success: true, data: order, keyId: razorpayEnv.keyId });
});
exports.verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const expected = crypto.createHmac('sha256', razorpayEnv.keySecret || '').update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex');
  if (expected !== razorpay_signature) throw new ApiError(400, 'Invalid payment signature');
  res.json({ success: true });
});
exports.placeOrder = asyncHandler(async (req, res) => {
  const { shipping_address, payment_method = 'cod', payment_id = null } = req.body;
  const id = await transaction(async (conn) => {
    const [cart] = await conn.execute('SELECT c.product_id, c.quantity, p.price, p.name FROM cart_items c JOIN products p ON p.id=c.product_id WHERE c.user_id=? AND p.stock >= c.quantity', [req.user.id]);
    if (!cart.length) throw new ApiError(400, 'Cart is empty or stock is unavailable');
    const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
    const [order] = await conn.execute('INSERT INTO orders (user_id,total_amount,payment_method,payment_id,payment_status,shipping_address,status) VALUES (?,?,?,?,?,?,?)', [req.user.id, total, payment_method, payment_id, payment_method === 'cod' ? 'pending' : 'paid', JSON.stringify(shipping_address), 'placed']);
    for (const item of cart) {
      await conn.execute('INSERT INTO order_items (order_id,product_id,product_name,quantity,price) VALUES (?,?,?,?,?)', [order.insertId, item.product_id, item.name, item.quantity, item.price]);
      await conn.execute('UPDATE products SET stock=stock-? WHERE id=?', [item.quantity, item.product_id]);
    }
    await conn.execute('DELETE FROM cart_items WHERE user_id=?', [req.user.id]);
    return order.insertId;
  });
  res.status(201).json({ success: true, id });
});
exports.myOrders = asyncHandler(async (req, res) => {
  const orders = await query('SELECT * FROM orders WHERE user_id=:userId ORDER BY created_at DESC', { userId: req.user.id });
  res.json({ success: true, data: orders });
});
exports.adminOrders = asyncHandler(async (_req, res) => {
  const data = await query('SELECT o.*, u.name user_name, u.email user_email FROM orders o JOIN users u ON u.id=o.user_id ORDER BY o.created_at DESC');
  res.json({ success: true, data });
});
exports.updateStatus = asyncHandler(async (req, res) => {
  await query('UPDATE orders SET status=:status WHERE id=:id', { id: req.params.id, status: req.body.status });
  res.json({ success: true });
});
