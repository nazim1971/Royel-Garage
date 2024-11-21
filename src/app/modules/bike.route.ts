import express from 'express';
import { BikeControllers } from './bike.controller';

const router = express.Router();

router.post('/api/products', BikeControllers.createBike);

export const bikeRoutes = router;