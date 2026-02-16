import express, { Request, Response } from 'express';
import dotenv from 'dotenv'

dotenv.config();
// initialize dotenv

const app = express();

app.get('/', (req: Request, res: Response) => {
	res.send("Back to Backend API 🎮");
});

app.listen(process.env.PORT, () => { 
	console.log(`🎮 Back to Backend API listening on port ${process.env.PORT}`)
})