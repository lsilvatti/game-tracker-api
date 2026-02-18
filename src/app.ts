import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv'

import gameRoutes from '@routes/gameRoutes.js';
import errorMiddleware from '@middlewares/error.js';
import loggerMiddleware from '@middlewares/logger.js';

dotenv.config();
// initialize dotenv

const app = express();

app.use(express.json());

app.use(loggerMiddleware);

app.get('/', (req: Request, res: Response) => {
	res.send("Back to Backend API 🎮");
});

app.use('/games', gameRoutes);
app.use(errorMiddleware);


export default app;