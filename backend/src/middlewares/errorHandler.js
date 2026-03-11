// Central error-handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack || err.message);

  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    message,
  });
};

// Wrap async route handlers so unhandled promise rejections flow into errorHandler
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = { errorHandler, asyncHandler };
