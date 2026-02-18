import { type Request, type Response, type NextFunction } from 'express';
import joi from 'joi';
import type { IApiError } from '@helpers/apiError.js';

function errorMiddleware(err: unknown, req: Request, res: Response, next: NextFunction) {
    if (err instanceof joi.ValidationError) {
        return res.status(400).json({
            error: 'ValidationError',
            message: err.details.map(detail => detail.message).join(', '),
        });
    }

    if (err instanceof Error && typeof err === 'object' && (err as IApiError).isApiError)  {
        return res.status((err as IApiError).statusCode).json({
            error: err.name,
            message: err.message,
        });
    }

    console.error('Error:', err);

    if (err instanceof Error) {
        return res.status(500).json({
            error: 'InternalServerError',
            message: process.env.NODE_ENV === 'development' ? err.message : 'An internal server error occurred.',
        });
    }

    return res.status(500).json({
        error: 'UnknownError',
        message: 'An unknown error occurred.',
    });
}

export default errorMiddleware;