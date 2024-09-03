import express, { Request, Response } from 'express';

const app = express();
const port = 3210; // TODO: use a .env file

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express with TypeScript!');
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
