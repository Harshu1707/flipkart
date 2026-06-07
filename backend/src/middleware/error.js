const { validationResult } = require('express-validator');
const ApiError = require('../utils/apiError');

function validate(req, _res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new ApiError(422, 'Validation failed', errors.array()));
  return next();
}

function notFound(req, _res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: error.message || 'Internal server error',
    details: error.details,
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
  });
}

module.exports = { validate, notFound, errorHandler };
