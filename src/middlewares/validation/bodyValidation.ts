import { type ObjectSchema } from 'joi';
import { type Request, type Response, type NextFunction } from 'express';

function bodyValidationMiddleware(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        
        if (error) {
            return next(error);
        }

        next();
    }
}

export default bodyValidationMiddleware;