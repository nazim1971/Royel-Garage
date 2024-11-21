import { Types } from "mongoose";

export type Tbike = {
  name: string;
  brand: string;
  price: number;
  category: 'Mountain' | 'Road' | 'Hybrid' | 'Electric';
  description: string;
  quantity: number;
  isStock: boolean;
};

export type Torder = {
  email: string;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
};

