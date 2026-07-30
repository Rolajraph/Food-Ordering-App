import { Router } from 'express';

const router = Router();

// Resource routers will be mounted here as they're built:
// router.use('/auth', authRoutes);
// router.use('/foods', foodRoutes);
// router.use('/categories', categoryRoutes);
// router.use('/orders', orderRoutes);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Food Ordering API — v1' });
});

export default router;