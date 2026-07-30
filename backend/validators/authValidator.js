import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be under 50 characters'),
  email: z.email('Please provide a valid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password must be under 72 characters'), // bcrypt silently truncates beyond 72 bytes
  phone: z.string().trim().optional(),
});

export const loginSchema = z.object({
  email: z.email('Please provide a valid email'),
  password: z.string().min(1, 'Password is required'),
});