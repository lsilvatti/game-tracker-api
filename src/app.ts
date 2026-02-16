import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv'

dotenv.config();
// initialize dotenv

const app = express();

app.get('/', (req: Request, res: Response) => {
	res.send("Back to Backend API 🎮");
});

export default app;