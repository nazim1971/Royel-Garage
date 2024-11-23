"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBikeValidationSchema = exports.bikeValidationSchema = void 0;
const zod_1 = require("zod");
const bikeValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim(),
    brand: zod_1.z
        .string()
        .trim(),
    price: zod_1.z
        .number()
        .min(0, { message: 'Bike price must be a positive value' }),
    category: zod_1.z.enum(['Mountain', 'Road', 'Hybrid', 'Electric'], {
        required_error: 'Bike category is required',
    }),
    description: zod_1.z
        .string()
        .min(10, { message: 'Description must be at least 10 characters long' }),
    quantity: zod_1.z
        .number()
        .min(0, { message: 'Quantity cannot be negative' }),
    isStock: zod_1.z
        .boolean()
        .default(true)
}).strict();
exports.bikeValidationSchema = bikeValidationSchema;
const updateBikeValidationSchema = bikeValidationSchema.partial().strict();
exports.updateBikeValidationSchema = updateBikeValidationSchema;
