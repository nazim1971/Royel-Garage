import express, { Request, Response } from 'express';
import cors from 'cors';
import { bikeRoutes } from './app/modules/bike/bike.route';
import { orderRoutes } from './app/modules/order/order.route';

const app = express();

//parsers
app.use(express.json());
app.use(cors());


//Application Routes
app.use('/', bikeRoutes);
app.use('/', orderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Royel Grarage Server on Fire 🔥🔥🔥',
  });
});

export default app;
