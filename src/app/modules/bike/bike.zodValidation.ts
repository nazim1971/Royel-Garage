import { z } from 'zod';

 const bikeValidationSchema = z.object({
  name: z
    .string()
    .trim(),
  brand: z
    .string()
    .trim(),
  price: z
    .number()
    .min(0, { message: 'Bike price must be a positive value' }),
  category: z.enum(['Mountain', 'Road', 'Hybrid', 'Electric'], {
    required_error: 'Bike category is required',
  }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' }),
  quantity: z
    .number()
    .min(0, { message: 'Quantity cannot be negative' }),
  isStock: z
    .boolean()
    .default(true)
}).strict();

const updateBikeValidationSchema = bikeValidationSchema.partial().strict()

export {bikeValidationSchema,updateBikeValidationSchema};