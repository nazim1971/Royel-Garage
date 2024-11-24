import { Request, Response } from 'express';
import { orderService } from './order.service';
import { Bike } from '../bike/bike.model';
import mongoose from 'mongoose';
import { checkBikeAvailability } from '../../utilities/order/checkBikeAbility';

// Main function to handle order creation
const createOrder = async (req: Request, res: Response) => {
 

  try {
    const { email, product, quantity, totalPrice: orderTotalPrice } = req.body;
    // Check bike availability
    const availabilityError = await checkBikeAvailability(product, quantity);
    if (availabilityError) {
      return res
        .status(404)
        .json({ message: availabilityError, success: false });
    }

    // Fetch bike details using aggregation to calculate total price
    const [bike] = await Bike.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(product) } },
      {
        $project: {
          price: 1,
          quantity: 1,
          isStock: 1,
          totalPrice: { $multiply: ['$price', quantity] },
        },
      },
    ]);

    if (!bike) {
      return res
        .status(404)
        .json({ message: 'Bike not found', success: false });
    }

    const totalPrice = orderTotalPrice || bike.totalPrice;

    if (bike.quantity < quantity) {
      return res.status(400).json({
        message: `Only ${bike.quantity} bikes available`,
        success: false,
      });
    }

    // Update bike quantity and stock status
    const updatedQuantity = bike.quantity - quantity;
    const isStock = updatedQuantity > 0;

    await Bike.updateOne(
      { _id: product },
      { $set: { quantity: updatedQuantity, isStock } },
    );

    // Prepare and create the order
    const orderInfo = { email, product: bike._id, quantity, totalPrice };
    const result = await orderService.createOrder(orderInfo);

    return res.status(201).json({
      message: 'Order created successfully',
      success: true,
      data: result,
    });
  } catch (err) {
    const error = err as Error;
    return res.status(500).json({
      message: 'Order creation failed',
      success: false,
      error: error.message,
      stack: error.stack,
    });
  }
};

// Get total revenue
const getTotalRevenueController = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await orderService.getTotalRevenue(); // Call the service to get total revenue
    return res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: {
        totalRevenue, // Send the calculated revenue in the response
      },
    });
  } catch (err) {
    const error = err as Error;
    return res.status(500).json({
      message: 'Error calculating revenue',
      status: false,
      error: error.message,
    });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getAllOrderFromDB();
    if (result.length === 0) {
      return res.status(404).json({
        message: 'Not Order Found',
        status: false,
        data: result,
      });
    }
    return res.status(200).json({
      message: 'Orders retrieved successfully',
      status: true,
      data: result,
    });
  } catch (err) {
    const error = err as Error;
    return res.status(500).json({
      message: error.message,
      success: false,
      error: error,
    });
  }
};

export const orderController = {
  createOrder,
  getTotalRevenueController,
  getAllOrder,
};
