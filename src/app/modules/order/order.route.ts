import express from 'express'
import { orderController } from './order.controller';

const router = express.Router();

router.post('/api/orders', orderController.createOrder);
router.get('/api/orders/revenue', orderController.getTotalRevenueController);

export const orderRoutes = router;