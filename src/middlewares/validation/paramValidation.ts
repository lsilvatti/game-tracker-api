import { type ObjectSchema } from 'joi';
import { type Request, type Response, type NextFunction } from 'express';

function paramValidationMiddleware(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.params, {
            convert: true,
            stripUnknown: true,
            abortEarly: false
        });

        if (error) {
            return next(error);
        }

        Object.defineProperty(req, 'params', {
            value: value,
            writable: true
        });
        
        next();
    }
}

export default paramValidationMiddleware;