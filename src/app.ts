import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

//parsers
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Royel Grarage Server on Fire');
});

export default app;
