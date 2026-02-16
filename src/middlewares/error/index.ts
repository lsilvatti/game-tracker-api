import { type Request, type Response, type NextFunction } from 'express';
import { ValidationError } from 'joi';

function errorMiddleware(err: unknown, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ValidationError) {
        return res.status(400).json({
            error: 'ValidationError',
            message: err.details.map(detail => detail.message).join(', '),
        });
    }

    if (err instanceof Error) {
        return res.status(500).json({
            error: 'InternalServerError',
            message: err.message,
        });
    }

    return res.status(500).json({
        error: 'UnknownError',
        message: 'An unknown error occurred.',
    });
}

export default errorMiddleware;