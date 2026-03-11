const router = require('express').Router();
const { placeOrder, getOrders, getOrderById } = require('../controllers/orderController');
const { verifyToken } = require('../middlewares/auth');

router.post('/',    verifyToken, placeOrder);
router.get('/',     verifyToken, getOrders);
router.get('/:id',  verifyToken, getOrderById);

module.exports = router;
