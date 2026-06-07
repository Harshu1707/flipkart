const router = require('express').Router();
const admin = require('../controllers/adminController');
router.get('/analytics', admin.analytics);
module.exports = router;
