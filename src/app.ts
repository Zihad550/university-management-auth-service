import express, { Application, Request, Response } from 'express';

const app: Application = express();
const port = process.env.PORT || 9000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to hospital management server');
});

export default app;
