import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { type Express } from 'express';

const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Game Tracker API Documentation',
            version: '1.0.0',
            description: 'A backend study case for tracking video games, built with Node.js, Express, and TypeScript.',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local Server',
            },
        ],
    },

    apis: ['./src/docs/*.yaml'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export function setupSwagger(app: Express) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
            defaultModelExpandDepth: 10, 
            defaultModelsExpandDepth: 10,
            docExpansion: 'list' 
        }
    }));
    
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}