const { clienteDelete } = require('../controllers/clients/delete');
const { clientGetAll } = require('../controllers/clients/getAll');
const { listName } = require("../controllers/clients/listName");
const { clientRegister } = require('../controllers/clients/register');

const clientRoutes = require('express').Router();

clientRoutes.post('/client/register', clientRegister);
clientRoutes.delete('/client/delete/:id', clienteDelete);
clientRoutes.get('/client/getAll', clientGetAll);
clientRoutes.get('/client/listName', listName);

module.exports = clientRoutes;
