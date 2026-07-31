import { Router } from 'express';
import * as orderController from '../controllers/orderController.js';
import validate from '../middleware/validateMiddleware.js';
import protect from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/adminMiddleware.js';
import { createOrderSchema, updateOrderStatusSchema } from '../validators/orderValidator.js';

const router = Router();

// Customer
router.post('/', protect, validate(createOrderSchema), orderController.createOrder);
router.get('/my-orders', protect, orderController.getMyOrders);

// Admin only
router.get('/', protect, isAdmin, orderController.getAllOrders);

// Customer (own order) or admin (any order) — ownership check lives in the service
router.get('/:id', protect, orderController.getOrder);

// Admin only
router.patch('/:id/status', protect, isAdmin, validate(updateOrderStatusSchema), orderController.updateOrderStatus);

export default router;