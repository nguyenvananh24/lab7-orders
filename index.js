require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRouter = require('./routes/authRouter');
const orderRouter = require('./routes/orderRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Ensure DB is connected for serverless invocations (e.g. Vercel)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('Database connection failed on request:', err.message);
    res.status(500).send('Database connection error. Please ensure MONGODB_URI is correctly configured.');
  }
});

// Authentication routes (/login, /register, /logout)
app.use('/', authRouter);

// Order management routes (protected with requireAuth)
app.use('/orders', orderRouter);

// Root redirect
app.get('/', (req, res) => res.redirect('/orders'));

// Start local server if run directly
if (require.main === module) {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(` Server running: http://localhost:${PORT}`);
      console.log(` Login page:    http://localhost:${PORT}/login`);
      console.log(` Orders page:   http://localhost:${PORT}/orders`);
    });
  }).catch((err) => {
    console.error('Server startup error:', err.message);
  });
}

module.exports = app;
