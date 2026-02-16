import express, { type Request, type Response } from 'express';
import gameRoutes from '@routes/game/index.js';
import errorMiddleware from '@middlewares/error/index.js';
import dotenv from 'dotenv'

dotenv.config();
// initialize dotenv

const app = express();

app.get('/', (req: Request, res: Response) => {
	res.send("Back to Backend API 🎮");
});

app.use('/game', gameRoutes);

app.use(errorMiddleware);

export default app;