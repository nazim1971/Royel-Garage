import { Torder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (orderData: Torder) => {
  const result = await Order.create(orderData);
  return result;
};

// Calculate the total revenue
const getTotalRevenue = async () => {
  try {
    const result = await Order.aggregate([
      {
        $lookup: {
          from: 'bikes', 
          localField: 'product', 
          foreignField: '_id', 
          as: 'bikeDetails', 
        },
      },
      {
        $unwind: {
          path: '$bikeDetails',
          preserveNullAndEmptyArrays: false, 
        },
      },
      {
        $addFields: {
          totalPrice: { $multiply: ['$bikeDetails.price', '$quantity'] }, 
        },
      },
      {
        $group: {
          _id: null, 
          totalRevenue: { $sum: '$totalPrice' }, 
        },
      },
      {
        $project: {
          _id: 0, 
          totalRevenue: 1,
        },
      },
    ]);

    const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;
    return totalRevenue;
  } catch (err) {
    const error = err as Error;
    throw new Error('Error calculating revenue: ' + error.message);
  }
};

const getAllOrderFromDB = async () => {
  try {
    const result = await Order.find();
    return result;
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};

export const orderService = {
  createOrder,
  getTotalRevenue,
  getAllOrderFromDB
};
