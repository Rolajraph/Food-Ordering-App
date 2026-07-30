import ApiError from '../utils/ApiError.js';

const errorHandler = (err, req, res, next) => {
  let error = err;

  // Normalize unexpected errors (e.g. Mongoose CastError) into ApiError shape
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    error = new ApiError(statusCode, error.message || 'Internal Server Error', false);
  }

  if (process.env.NODE_ENV === 'development') {
    console.error(error);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errors: error.errors,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};

export default errorHandler;