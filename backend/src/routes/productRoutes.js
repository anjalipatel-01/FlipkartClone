const router = require('express').Router();
const { getProducts, getProductById } = require('../controllers/productController');
const { optionalAuth } = require('../middlewares/auth');

router.get('/',    optionalAuth, getProducts);
router.get('/:id', optionalAuth, getProductById);

module.exports = router;
