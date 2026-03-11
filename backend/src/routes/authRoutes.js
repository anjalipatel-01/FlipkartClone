const router = require('express').Router();
const { register, login, logout, getMe } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/auth');

router.post('/register', register);
router.post('/login',    login);
router.post('/logout',   logout);
router.get('/me',        verifyToken, getMe);

module.exports = router;
