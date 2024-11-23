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
    if (bike!.quantity === 0) {
        bike!.isStock = false; // Mark the bike as out of stock
      }
      await bike!.save();

    const orderInfo = { email, product: bike!._id, quantity, totalPrice };

    const result = await orderService.createOrder(orderInfo);
   return res.status(201).json({
      message: 'Order created successfully',
      success: true,
      data: result,
    });
  } catch (err) {
    const error = err as Error;
   return res.status(500).json({
      message: 'Validation failed',
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};

// Get total revenue
const getTotalRevenueController = async (req: Request, res: Response) => {
    try {
      const totalRevenue = await orderService.getTotalRevenue(); // Call the service to get total revenue
    return  res.status(200).json({
        message: 'Revenue calculated successfully',
        status: true,
        data: {
          totalRevenue, // Send the calculated revenue in the response
        },
      });
    } catch (err) {
        const error = err as Error;
      return  res.status(500).json({
          message: 'Error calculating revenue',
          status: false,
          error: error.message,
        });
      }
  };

export const orderController = {
  createOrder,
  getTotalRevenueController
};
