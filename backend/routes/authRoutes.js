import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import validate from '../middleware/validateMiddleware.js';
import protect from '../middleware/authMiddleware.js';
import { registerSchema, loginSchema } from '../validators/authValidator.js';
import isAdmin from '../middleware/adminMiddleware.js';

const router = Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/profile', protect, authController.getProfile);
router.get('/users', protect, isAdmin, authController.getUsers);

export default router;