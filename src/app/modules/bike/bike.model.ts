import { model, Schema } from 'mongoose';
import { Tbike } from './bike.interface';


function validateType(value: any, expectedType: string) {
  if (typeof value !== expectedType) {
    throw new Error(`Value must be a ${expectedType}`);
  }
  return value;
}

const bikeSchema = new Schema<Tbike>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Bike name is required'],
    set: (value: any) => validateType(value, 'string'),
  },
  brand: {
    type: String,
    trim: true,
    required: [true, 'Brand name is required'],
    set: (value: any) => validateType(value, 'string'),
  },
  price: {
    type: Number,
    required: [true, 'Bike price is required'],
    min: [0, 'Bike price must be a positive value'],
  },
  category: {
    type: String,
    enum: ['Mountain', 'Road', 'Hybrid', 'Electric'],
    required: [true, 'Bike category is required'],
  },
  description: {
    type: String,
    required: [true, 'Bike description is required'],
    minlength: [10, 'Description must be at least 10 characters long'],
    set: (value: any) => validateType(value, 'string'),
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative'],
  },
  isStock: {
    type: Boolean,
    required: [true, 'Stock status is required'],
  },
}, {
  timestamps: true
});



export const Bike = model<Tbike>('bikes', bikeSchema);
