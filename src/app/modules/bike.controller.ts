import { Request, Response } from 'express';
import { bikeService } from './bike.service';

const createBike = async (req: Request, res: Response) => {
  try {
    const bikeInfo = req.body;
    const result = await bikeService.createBike(bikeInfo);
    res.status(201).json({
      message: 'Bike created successfully',
      success: true,
      data: result,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }

};


export const BikeControllers = {
    createBike
}