import { ApiError } from '../utils/Api-error.js';

// Must be registered LAST in app.js, after all routes:
//   app.use(errorHandler)
export const errorHandler = (err, _req, res, _next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }

  console.error(err);
  return res.status(500).json({
    success: false,
    message: 'Internal server error',
    errors: [],
  });
};

// Catches requests to routes that don't exist (404)
export const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};