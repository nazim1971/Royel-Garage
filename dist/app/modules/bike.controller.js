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
exports.BikeControllers = void 0;
const bike_service_1 = require("./bike.service");
const createBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bikeInfo = req.body;
        const result = yield bike_service_1.bikeService.createBike(bikeInfo);
        res.status(201).json({
            message: 'Bike created successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        const error = err;
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
});
exports.BikeControllers = {
    createBike
};
