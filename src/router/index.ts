import chargesRoutes from './charges.routes';
import clientRoutes from './client.routes';
import swaggerRoutes from './swagger.routes';
import userRoutes from './users.routes';

const routes = require('express').Router();

routes.use(swaggerRoutes);
routes.use(userRoutes);
routes.use(clientRoutes);
routes.use(chargesRoutes);

export default routes;
