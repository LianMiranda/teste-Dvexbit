import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export class AppError extends Error {
    public statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}


