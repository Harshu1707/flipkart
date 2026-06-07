const { body, param } = require('express-validator');

exports.registerRules = [body('name').trim().isLength({ min: 2 }), body('email').isEmail().normalizeEmail(), body('password').isLength({ min: 8 })];
exports.loginRules = [body('email').isEmail().normalizeEmail(), body('password').notEmpty()];
exports.productRules = [body('name').trim().isLength({ min: 2 }), body('category_id').isInt(), body('price').isFloat({ min: 0 }), body('mrp').isFloat({ min: 0 }), body('stock').isInt({ min: 0 })];
exports.categoryRules = [body('name').trim().isLength({ min: 2 })];
exports.cartRules = [body('product_id').isInt(), body('quantity').optional().isInt({ min: 1 })];
exports.orderRules = [body('shipping_address.fullName').notEmpty(), body('shipping_address.address').notEmpty(), body('shipping_address.pincode').notEmpty()];
exports.reviewRules = [param('productId').isInt(), body('rating').isInt({ min: 1, max: 5 })];
