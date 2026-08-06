import { z } from 'zod';

export const createFoodSchema = z.object({
  name: z.string().trim().min(2).max(80),
  description: z.string().trim().min(1).max(500),
  price: z.coerce.number().positive('Price must be greater than 0'),
  category: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID'),
  isAvailable: z.boolean().optional(),
});

export const updateFoodSchema = createFoodSchema.partial();