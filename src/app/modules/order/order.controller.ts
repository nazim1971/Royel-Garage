import { Request, Response } from 'express';
import { orderService } from './order.service';
import { Bike } from '../bike/bike.model';

const checkBikeAvailability = async (productId: string, quantity: number) => {
  const bike = await Bike.findOne({ _id: productId });
  if (!bike) return 'The bike does not exist.';
  if (!bike.isStock) return 'The bike is out of stock.';
  if (bike.quantity < quantity || bike.quantity === 0)
    return `Insufficient stock. Only ${bike.quantity} items are available.`;
  return null;
};

const createOrder = async (req: Request, res: Response) => {
  const { email, product, quantity } = req.body;
  try {
    // Check bike availability
    const availabilityError = await checkBikeAvailability(product, quantity);
    if (availabilityError) {
      return res
        .status(404)
        .json({ message: availabilityError, success: false });
    }

    // Proceed to create order
    const bike = await Bike.findOne({ _id: product });
    const totalPrice = bike!.price * quantity; // Assert bike is found
    bike!.quantity -= quantity; // Update quantity
    await bike!.save();

    const orderInfo = { email, product: bike!._id, quantity, totalPrice };

    const result = await orderService.createOrder(orderInfo);
    res.status(201).json({
      message: 'Order created successfully',
      success: true,
      data: result,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      message: 'Validation failed',
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};

export const orderController = {
  createOrder,
};
