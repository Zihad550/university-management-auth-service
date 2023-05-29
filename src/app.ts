import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to hospital management server');
});

export default app;
