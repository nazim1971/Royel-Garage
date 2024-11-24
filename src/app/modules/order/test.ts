// Utility function to check bike availability
const checkBikeAvailability = async (productId: string, quantity: number) => {
  const bike = await Bike.findOne({ _id: productId });

  if (!bike) return 'The bike does not exist.';
  if (!bike.isStock) return 'The bike is out of stock.';
  if (bike.quantity < quantity) 
    return `Insufficient stock. Only ${bike.quantity} items are available.`;

  return null; // No errors, the bike is available
};

// Main function to handle order creation
const createOrder = async (req: Request, res: Response) => {
  const { email, product, quantity, totalPrice: orderTotalPrice } = req.body;

  try {
    // Check bike availability
    const availabilityError = await checkBikeAvailability(product, quantity);
    if (availabilityError) {
      return res.status(404).json({ message: availabilityError, success: false });
    }

    // Fetch bike details using aggregation to calculate total price
    const [bike] = await Bike.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(product) } }, // Match bike by product ID
      { $project: {
          price: 1,
          quantity: 1,
          isStock: 1,
          totalPrice: { $multiply: ["$price", quantity] }, // Calculate total price
      }},
    ]);

    if (!bike) {
      return res.status(404).json({ message: 'Bike not found', success: false });
    }

    // Determine the total price (from request or calculated)
    const totalPrice = orderTotalPrice || bike.totalPrice;

    // Check if there is enough stock
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
      { $set: { quantity: updatedQuantity, isStock } }
    );

    // Prepare and create the order
    const orderInfo = { email, product: bike._id, quantity, totalPrice };
    const result = await orderService.createOrder(orderInfo);

    // Respond with success
    return res.status(201).json({
      message: 'Order created successfully',
      success: true,
      data: result,
    });
  } catch (err) {
    const error = err as Error;

    // Handle any unexpected errors
    return res.status(500).json({
      message: 'Order creation failed',
      success: false,
      error: error.message,
      stack: error.stack,
    });
  }
};
