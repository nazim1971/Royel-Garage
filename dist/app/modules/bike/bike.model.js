"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bike = void 0;
const mongoose_1 = require("mongoose");
function validateType(value, expectedType) {
    if (typeof value !== expectedType) {
        throw new Error(`Value must be a ${expectedType}`);
    }
    return value;
}
const bikeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Bike name is required'],
        set: (value) => validateType(value, 'string'),
    },
    brand: {
        type: String,
        trim: true,
        required: [true, 'Brand name is required'],
        set: (value) => validateType(value, 'string'),
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
        set: (value) => validateType(value, 'string'),
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity cannot be negative'],
    },
    isStock: {
        type: Boolean,
        required: [true, 'Stock status is required'],
    },
}, {
    timestamps: true
});
exports.Bike = (0, mongoose_1.model)('bikes', bikeSchema);
