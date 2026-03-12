const router = require('express').Router();
const { register, login, logout, getMe, updateProfile } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/auth');

router.post('/register', register);
router.post('/login',    login);
router.post('/logout',   logout);
router.get('/me',        verifyToken, getMe);
router.put('/me',        verifyToken, updateProfile);

module.exports = router;
