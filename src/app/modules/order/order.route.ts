import express from 'express'
import { orderController } from './order.controller';

const router = express.Router();

router.post('/api/orders', orderController.createOrder);

export const orderRoutes = router;