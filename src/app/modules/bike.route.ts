import express from 'express';
import { BikeControllers } from './bike.controller';

const router = express.Router();

router.post('/api/products', BikeControllers.createBike);
router.get('/api/products', BikeControllers.getAllBike);
router.get('/api/products/:bikeId', BikeControllers.getSingleBike);
router.put('/api/products/:bikeId', BikeControllers.updateSingleBike);
router.delete('/api/products/:bikeId', BikeControllers.deleteSingleBike);

export const bikeRoutes = router;
