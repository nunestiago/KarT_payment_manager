const { clienteDelete } = require('../controllers/clients/delete');
const { clientRegister } = require('../controllers/clients/register');

const clientRoutes = require('express').Router();

clientRoutes.post('/client/register', clientRegister);
clientRoutes.delete('/client/delete/:id', clienteDelete);

module.exports = clientRoutes;
