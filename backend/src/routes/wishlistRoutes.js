const router = require('express').Router();
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  checkWishlist,
} = require('../controllers/wishlistController');
const { verifyToken } = require('../middlewares/auth');

router.get('/',                    verifyToken, getWishlist);
router.post('/',                   verifyToken, addToWishlist);
router.get('/check/:product_id',   verifyToken, checkWishlist);
router.delete('/:product_id',      verifyToken, removeFromWishlist);

module.exports = router;
