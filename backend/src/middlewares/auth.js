const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let token;

  // 1. Try httpOnly cookie first
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // 2. Fall back to Authorization: Bearer header
  if (!token) {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7);
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Please login to continue' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, name: decoded.name, email: decoded.email };
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Please login to continue' });
  }
};

const optionalAuth = (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7);
    }
  }

  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, name: decoded.name, email: decoded.email };
  } catch {
    // Invalid token — treat as unauthenticated, don't block
    req.user = null;
  }

  next();
};

module.exports = { verifyToken, optionalAuth };
