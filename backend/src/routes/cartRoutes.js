const router = require('express').Router();
const cart = require('../controllers/cartController');
const { validate } = require('../middleware/error');
const { cartRules } = require('../validators');
router.get('/', cart.getCart);
router.post('/', cartRules, validate, cart.add);
router.put('/:id', cart.update);
router.delete('/:id', cart.remove);
module.exports = router;
