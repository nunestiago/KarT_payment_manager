import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

const swaggerRoutes = express.Router();

swaggerRoutes.use('/api-docs', swaggerUi.serve);
swaggerRoutes.get('/api-docs', swaggerUi.setup(swaggerDocument));

export default swaggerRoutes;
