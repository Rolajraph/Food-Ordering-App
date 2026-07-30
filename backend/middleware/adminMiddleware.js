import ApiError from '../utils/ApiError.js';
import { ROLES } from '../constants/roles.js';

const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== ROLES.ADMIN) {
    throw new ApiError(403, 'Not authorized, admin access required');
  }
  next();
};

export default isAdmin;