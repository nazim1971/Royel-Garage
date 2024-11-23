"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const bike_model_1 = require("../bike/bike.model");
const checkBikeAvailability = (productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const bike = yield bike_model_1.Bike.findOne({ _id: productId });
    if (!bike)
        return 'The bike does not exist.';
    if (!bike.isStock)
        return 'The bike is out of stock.';
    if (bike.quantity < quantity || bike.quantity === 0)
        return `Insufficient stock. Only ${bike.quantity} items are available.`;
    return null;
});
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, product, quantity, totalPrice: orderTotalPrice } = req.body;
    try {
        // Check bike availability
        const availabilityError = yield checkBikeAvailability(product, quantity);
        if (availabilityError) {
            return res
                .status(404)
                .json({ message: availabilityError, success: false });
        }
        // Proceed to create order
        const bike = yield bike_model_1.Bike.findOne({ _id: product });
        const totalPrice = orderTotalPrice || bike.price * quantity; // Assert bike is found
        bike.quantity -= quantity; // Update quantity
        yield bike.save();
        if (bike.quantity === 0) {
            bike.isStock = false; // Mark the bike as out of stock
        }
        yield bike.save();
        const orderInfo = { email, product: bike._id, quantity, totalPrice };
        const result = yield order_service_1.orderService.createOrder(orderInfo);
        return res.status(201).json({
            message: 'Order created successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        const error = err;
        return res.status(500).json({
            message: 'Validation failed',
            success: false,
            error: error,
            stack: error.stack,
        });
    }
});
// Get total revenue
const getTotalRevenueController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalRevenue = yield order_service_1.orderService.getTotalRevenue(); // Call the service to get total revenue
        return res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: {
                totalRevenue, // Send the calculated revenue in the response
            },
        });
    }
    catch (err) {
        const error = err;
        return res.status(500).json({
            message: 'Error calculating revenue',
            status: false,
            error: error.message,
        });
    }
});
exports.orderController = {
    createOrder,
    getTotalRevenueController
};
