import ApiError from '../utils/ApiError.js';

/**
 * Generic request-body validation middleware factory.
 * Usage: router.post('/register', validate(registerSchema), authController.register)
 */
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));

    return next(new ApiError(400, 'Validation failed', true, errors));
  }

  
  req.body = result.data;
  next();
};

export default validate;