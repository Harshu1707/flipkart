const Razorpay = require('razorpay');
const { razorpay } = require('./env');

module.exports = razorpay.keyId && razorpay.keySecret
  ? new Razorpay({ key_id: razorpay.keyId, key_secret: razorpay.keySecret })
  : null;
