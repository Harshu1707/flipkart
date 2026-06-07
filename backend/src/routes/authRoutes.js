const router = require('express').Router();
const auth = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const { validate } = require('../middleware/error');
const { registerRules, loginRules } = require('../validators');
router.post('/register', registerRules, validate, auth.register);
router.post('/login', loginRules, validate, auth.login);
router.get('/me', authenticate, auth.me);
module.exports = router;
