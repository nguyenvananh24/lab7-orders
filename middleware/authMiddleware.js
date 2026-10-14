const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'lab7_orders_management_secret_key_2026';

const requireAuth = (req, res, next) => {
  const token = req.cookies?.token || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);

  if (!token) {
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    res.locals.user = decoded;
    next();
  } catch (err) {
    res.clearCookie('token');
    return res.redirect('/login');
  }
};

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).render('order', {
        orders: [],
        error: 'Access denied: You do not have permission for this action.',
      });
    }
    next();
  };
};

module.exports = { requireAuth, requireRole, JWT_SECRET };
