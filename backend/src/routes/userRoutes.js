const router = require('express').Router();
const user = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');
router.get('/profile', user.profile);
router.put('/profile', user.updateProfile);
router.get('/', authenticate, authorize('admin'), user.list);
router.put('/:id', authenticate, authorize('admin'), user.update);
module.exports = router;
