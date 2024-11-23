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
const bike_zodValidation_1 = require("./bike.zodValidation");
//import { customErrorMsg } from '../../error/error.pretty';
const createBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bikeInfo = req.body;
        //Data validating using zod
        //const zodParseData = bikeValidationSchema.parse(bikeInfo);
        const result = yield bike_service_1.bikeService.createBike(bikeInfo);
        return res.status(201).json({
            message: 'Bike created successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        //const errMessage = customErrorMsg(err);
        const error = err;
        return res.status(500).json({
            message: 'Validation failed',
            success: false,
            error: error,
            stack: error.stack,
        });
    }
});
const getAllBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        const result = yield bike_service_1.bikeService.getAllBikeFromDB(searchTerm);
        if (result.length === 0) {
            return res.status(404).json({
                message: 'Not Bike Found',
                status: false,
                data: result,
            });
        }
        return res.status(200).json({
            message: 'Bikes retrieved successfully',
            status: true,
            data: result,
        });
    }
    catch (err) {
        const error = err;
        return res.status(500).json({
            message: error.message,
            success: false,
            error: error,
        });
    }
});
const getSingleBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Received bike id as param
        const { bikeId } = req.params;
        const result = yield bike_service_1.bikeService.getSingleBikeFromDB(bikeId);
        if (!result) {
            return res.status(404).json({
                message: 'Bike not found',
                status: false,
                data: {},
            });
        }
        return res.status(200).json({
            message: 'Bikes retrieved successfully',
            status: true,
            data: result,
        });
    }
    catch (err) {
        const error = err;
        return res.status(500).json({
            message: error.message,
            success: false,
            error: error,
        });
    }
});
const updateSingleBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bikeId } = req.params;
        const updatedBikeData = req.body;
        //Data validating using zod
        const zodParseData = bike_zodValidation_1.updateBikeValidationSchema.parse(updatedBikeData);
        const updatedBike = yield bike_service_1.bikeService.updateSingleBikeInfo(bikeId, zodParseData);
        if (!updatedBike) {
            return res.status(404).json({
                message: 'Bike not found',
                success: false,
            });
        }
        return res.status(200).json({
            message: 'Bike updated successfully',
            success: true,
            data: updatedBike,
        });
    }
    catch (err) {
        const error = err;
        return res.status(500).json({
            message: error.message,
            success: false,
            error: error,
        });
    }
});
const deleteSingleBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Received bike id as param
        const { bikeId } = req.params;
        const result = yield bike_service_1.bikeService.deleteSingleBikeFromDB(bikeId);
        if (!result) {
            return res.status(404).json({
                message: 'Bike not found',
                status: false,
                data: {},
            });
        }
        return res.status(200).json({
            message: 'Bike deleted successfully',
            status: true,
            data: {},
        });
    }
    catch (err) {
        const error = err;
        return res.status(500).json({
            message: error.message,
            success: false,
            error: error,
        });
    }
});
exports.BikeControllers = {
    createBike,
    getAllBike,
    getSingleBike,
    updateSingleBike,
    deleteSingleBike,
};
