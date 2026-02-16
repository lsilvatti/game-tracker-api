import app from './app.js';

app.listen(process.env.PORT, () => { 
	console.log(`🎮 Back to Backend API listening on port ${process.env.PORT}`);
})