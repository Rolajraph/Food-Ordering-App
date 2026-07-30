import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().trim().min(2).max(40),
  image: z.string().trim().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();