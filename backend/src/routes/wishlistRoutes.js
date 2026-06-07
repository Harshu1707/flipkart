const router = require('express').Router();
const wishlist = require('../controllers/wishlistController');
router.get('/', wishlist.list);
router.post('/', wishlist.add);
router.delete('/:productId', wishlist.remove);
module.exports = router;
