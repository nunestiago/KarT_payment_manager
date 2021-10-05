const chargesRoutes = require('./charges.routes');
const clientRoutes = require('./client.routes');
const swaggerRoutes = require('./swagger.routes');
const userRoutes = require('./users.routes');

const routes = require('express').Router();

routes.use(swaggerRoutes);
routes.use(userRoutes);
routes.use(clientRoutes);
routes.use(chargesRoutes);

module.exports = routes;
