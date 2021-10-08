const { clienteDelete } = require('../controllers/clients/delete');
const { editClient } = require('../controllers/clients/editClient');
const { clientGetAll } = require('../controllers/clients/getAll');
const { listName } = require('../controllers/clients/listName');
const { clientRegister } = require('../controllers/clients/register');

const clientRoutes = require('express').Router();

clientRoutes.post('/client/register', clientRegister);
clientRoutes.delete('/client/delete/:id', clienteDelete);
clientRoutes.get('/client/getAll', clientGetAll);
clientRoutes.get('/client/listName', listName);
clientRoutes.put('/client/edit', editClient);

module.exports = clientRoutes;
