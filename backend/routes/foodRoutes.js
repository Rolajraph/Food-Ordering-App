import { Router } from 'express';
import * as foodController from '../controllers/foodController.js';
import validate from '../middleware/validateMiddleware.js';
import protect from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/adminMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import { createFoodSchema, updateFoodSchema } from '../validators/foodValidator.js';

const router = Router();

// Public
router.get('/', foodController.getFoods);
router.get('/:id', foodController.getFood);

// Admin only
router.post('/', protect, isAdmin, upload.single('image'), validate(createFoodSchema), foodController.createFood);
router.put('/:id', protect, isAdmin, upload.single('image'), validate(updateFoodSchema), foodController.updateFood);
router.delete('/:id', protect, isAdmin, foodController.deleteFood);

export default router;