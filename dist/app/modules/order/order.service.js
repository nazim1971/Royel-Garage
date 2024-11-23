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
exports.orderService = void 0;
const order_model_1 = require("./order.model");
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.create(orderData);
    return result;
});
// Calculate the total revenue
const getTotalRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_model_1.Order.aggregate([
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
    }
    catch (err) {
        const error = err;
        throw new Error('Error calculating revenue: ' + error.message);
    }
});
exports.orderService = {
    createOrder,
    getTotalRevenue,
};
