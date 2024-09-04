import { Request, Response, NextFunction } from 'express';

class HttpError extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export function errorHandler(err: HttpError, req: Request, res: Response, next: NextFunction): void {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  console.log('handling error from middleware', err);
  res.status(status).json({ status, message });
}
