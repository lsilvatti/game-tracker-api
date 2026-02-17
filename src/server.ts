import app from './app.js';
import { setupSwagger } from './config/swagger.js';

if (process.env.NODE_ENV !== 'production') {
    setupSwagger(app);
    console.log('📚 Documentação do Swagger disponível em: http://localhost:3000/api-docs');
}

app.listen(process.env.PORT, () => { 
	console.log(`🎮 Back to Backend API listening on port ${process.env.PORT}`);
})