import { Torder } from "./order.interface";
import { Order } from "./order.model";


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
            from: 'bikes', // Name of the bike collection
            localField: 'product', // Field in the orders collection (product reference)
            foreignField: '_id', // Field in the bikes collection (bike ID)
            as: 'bikeDetails', // Alias for the bike data in the result
          },
        },
        {
          $unwind: {
            path: '$bikeDetails',
            preserveNullAndEmptyArrays: false, // Ensure every order has a matching bike
          },
        },
        {
          $addFields: {
            totalPrice: { $multiply: ['$bikeDetails.price', '$quantity'] }, // Multiply price by quantity
          },
        },
        {
          $group: {
            _id: null, // No need to group by anything specific
            totalRevenue: { $sum: '$totalPrice' }, // Sum the totalPrice for all orders
          },
        },
        {
          $project: {
            _id: 0, // Exclude the _id field
            totalRevenue: 1, // Include totalRevenue in the response
          },
        },
      ]);
  
      const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;
      return totalRevenue;
    } catch (err) {
        const error = err as Error
      throw new Error('Error calculating revenue: ' + error.message);
    }
  };

  export const orderService = {
    createOrder,
    getTotalRevenue
  }