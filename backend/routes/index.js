import { Router } from 'express';
import authRoutes from './authRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import foodRoutes from './foodRoutes.js';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Food Ordering API — v1' });
});

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/foods', foodRoutes);



export default router;