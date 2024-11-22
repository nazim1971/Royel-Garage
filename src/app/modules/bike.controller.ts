import { Request, Response } from 'express';
import { bikeService } from './bike.service';
import {
  bikeValidationSchema,
  updateBikeValidationSchema,
} from './bike.zodValidation';
import { processErrorMsgs } from '../error/error.pretty';

const createBike = async (req: Request, res: Response) => {
  try {
    const bikeInfo = req.body;

    //Data validating using zod
    const zodParseData = bikeValidationSchema.parse(bikeInfo);

    const result = await bikeService.createBike(zodParseData);
    res.status(201).json({
      message: 'Bike created successfully',
      success: true,
      data: result,
    });
  } catch (err) {
    const errMessage = processErrorMsgs(err);
    const error = err as Error;
    res.status(500).json({
      message: errMessage,
      success: false,
      error: error.stack,
    });
  }
};

const getAllBike = async (req: Request, res: Response) => {
  try {
    const result = await bikeService.getAllBikeFromDB();
    res.status(200).json({
      message: 'Bikes retrieved successfully',
      status: true,
      data: result,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      message: error.message,
      success: false,
      error: error,
    });
  }
};

const getSingleBike = async (req: Request, res: Response) => {
  try {
    //Received bike id as param
    const { bikeId } = req.params;

    const result = await bikeService.getSingleBikeFromDB(bikeId);
    res.status(200).json({
      message: 'Bikes retrieved successfully',
      status: true,
      data: result,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      message: error.message,
      success: false,
      error: error,
    });
  }
};

const updateSingleBike = async (req: Request, res: Response) => {
  try {
    const { bikeId } = req.params;
    const updatedBikeData = req.body;
    //Data validating using zod
    const zodParseData = updateBikeValidationSchema.parse(updatedBikeData);

    const updatedBike = await bikeService.updateSingleBikeInfo(
      bikeId,
      zodParseData,
    );
    if (!updatedBike) {
      return res.status(404).json({
        message: 'Bike not found',
        success: false,
      });
    }
    res.status(200).json({
      message: 'Bike updated successfully',
      success: true,
      data: updatedBike,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      message: error.message,
      success: false,
      error: error,
    });
  }
};

const deleteSingleBike = async (req: Request, res: Response) => {
  try {
    //Received bike id as param
    const { bikeId } = req.params;

    const result = await bikeService.deleteSingleBikeFromDB(bikeId);

    if (!result) {
      return res.status(404).json({
        message: 'Bike not found',
        status: false,
        data: {},
      });
    }
    
    res.status(200).json({
      message: 'Bike deleted successfully',
      status: true,
      data: {},
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      message: error.message,
      success: false,
      error: error,
    });
  }
};

export const BikeControllers = {
  createBike,
  getAllBike,
  getSingleBike,
  updateSingleBike,
  deleteSingleBike,
};
