require('dotenv').config();
const express      = require('express');
const cors         = require('cors');
const helmet       = require('helmet');
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');

const productRoutes    = require('./routes/productRoutes');
const cartRoutes       = require('./routes/cartRoutes');
const orderRoutes      = require('./routes/orderRoutes');
const authRoutes       = require('./routes/authRoutes');
const wishlistRoutes   = require('./routes/wishlistRoutes');
const { errorHandler } = require('./middlewares/errorHandler');
const { getCategories } = require('./controllers/productController');

const app  = express();
const PORT = process.env.PORT || 5000;

// Security & logging
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check
app.get('/health', (req, res) => res.json({ success: true, message: 'Server is running' }));

// API routes
app.use('/api/auth',      authRoutes);
app.use('/api/products',  productRoutes);
app.get('/api/categories', getCategories);
app.use('/api/cart',      cartRoutes);
app.use('/api/orders',    orderRoutes);
app.use('/api/wishlist',  wishlistRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Central error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
