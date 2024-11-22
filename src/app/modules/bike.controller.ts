import { Request, Response } from 'express';
import { bikeService } from './bike.service';
import { bikeValidationSchema } from './bike.zodValidation';

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
};
