const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { JWT_SECRET } = require('../middleware/authMiddleware');

const getLoginForm = (req, res) => {
  if (req.cookies?.token) {
    try {
      jwt.verify(req.cookies.token, JWT_SECRET);
      return res.redirect('/orders');
    } catch (e) {
      res.clearCookie('token');
    }
  }
  const error = req.query.error || null;
  const message = req.query.message || null;
  res.render('login', { error, message });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.render('login', { error: 'Please enter both username and password.', message: null });
  }

  const user = await User.findOne({ username: username.trim() });
  if (!user) {
    return res.render('login', { error: 'Invalid username or password.', message: null });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.render('login', { error: 'Invalid username or password.', message: null });
  }

  const token = jwt.sign(
    { userId: user._id, username: user.username, role: user.role, fullName: user.fullName },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'lax',
  });

  res.redirect('/orders');
};

const getRegisterForm = (req, res) => {
  res.render('register', { error: null });
};

const register = async (req, res) => {
  const { username, password, fullName, role } = req.body;
  if (!username || !password) {
    return res.render('register', { error: 'Username and password are required.' });
  }

  const existing = await User.findOne({ username: username.trim() });
  if (existing) {
    return res.render('register', { error: 'Username already exists. Please choose another.' });
  }

  await User.create({
    username: username.trim(),
    password,
    fullName: fullName || '',
    role: role === 'admin' ? 'admin' : 'staff',
  });

  res.redirect('/login?message=Registration successful! Please login.');
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};

module.exports = {
  getLoginForm,
  login,
  getRegisterForm,
  register,
  logout,
};
