import express, { Request, Response } from 'express';
import { errorHandler } from './middleware/errorHandler';
import dataRoutes from './routes/data.routes';

const app = express();
const port = 3210; // TODO: use a .env file

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express with TypeScript!');
});

// API ROUTES
app.use('/api', dataRoutes);

// MIDDLEWARES
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
