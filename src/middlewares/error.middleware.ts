import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';

export function errorMiddleware(
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof AppError) {
     res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.error(err); 
 res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
}