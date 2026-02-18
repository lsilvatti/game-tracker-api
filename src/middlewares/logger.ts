import { type Request, type Response, type NextFunction } from 'express';

function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log(`Incoming Request: ${req.method} on route ${req.url} at ${new Date().toLocaleString('pt-BR', { timeZone: 'UTC' })} UTC(0)` );
    next();
}

export default loggerMiddleware