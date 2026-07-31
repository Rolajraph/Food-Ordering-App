import { Router } from 'express';
import * as categoryController from '../controllers/categoryController.js';
import validate from '../middleware/validateMiddleware.js';
import protect from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/adminMiddleware.js';
import { createCategorySchema, updateCategorySchema } from '../validators/categoryValidator.js';

const router = Router();

// Public
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategory);

// Admin only
router.post('/', protect, isAdmin, validate(createCategorySchema), categoryController.createCategory);
router.put('/:id', protect, isAdmin, validate(updateCategorySchema), categoryController.updateCategory);
router.delete('/:id', protect, isAdmin, categoryController.deleteCategory);

export default router;