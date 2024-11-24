import express from 'express'
import { orderController } from './order.controller';

const router = express.Router();
//All Order related routes
router.post('/api/orders', orderController.createOrder);
router.get('/api/orders', orderController.getAllOrder);
router.get('/api/orders/revenue', orderController.getTotalRevenueController);

export const orderRoutes = router;