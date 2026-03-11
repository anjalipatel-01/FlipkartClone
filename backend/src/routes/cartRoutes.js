const router = require('express').Router();
const {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require('../controllers/cartController');
const { verifyToken } = require('../middlewares/auth');

router.get('/',             verifyToken, getCart);
router.delete('/',          verifyToken, clearCart);
router.post('/items',       verifyToken, addCartItem);
router.put('/items/:id',    verifyToken, updateCartItem);
router.delete('/items/:id', verifyToken, removeCartItem);

module.exports = router;
