class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational; // distinguishes expected errors (bad input) from bugs
    this.errors = errors; // for structured validation error lists
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;