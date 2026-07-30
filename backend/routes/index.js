import { Router } from 'express';
import authRoutes from './authRoutes.js';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Food Ordering API — v1' });
});

router.use('/auth', authRoutes);

// Future resource routers mount here:
// router.use('/foods', foodRoutes);
// router.use('/categories', categoryRoutes);
// router.use('/orders', orderRoutes);

export default router;