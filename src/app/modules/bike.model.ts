import { model, Schema } from 'mongoose';
import { Tbike } from './bike.interface';



const bikeSchema = new Schema<Tbike >({
  name: {
    type: String,
    trim: true,
    required: [true, 'Bike name is required'],
  },
  brand: {
    type: String,
    trim: true,
    required: [true, 'Brand name is required'],
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
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative'],
  },
  isStock: {
    type: Boolean,
    required: [true, 'Stock status is required'],
    default: true,
  },
}, {
  timestamps: true, 
});

export const Bike = model<Tbike >('Bike', bikeSchema);



