import clienteDelete from '../controllers/clients/delete';
import editClient from '../controllers/clients/editClient';
import clientGetAll from '../controllers/clients/getAll';
import listName from '../controllers/clients/listName';
import clientRegister from '../controllers/clients/register';

const clientRoutes = require('express').Router();

clientRoutes.post('/client/register', clientRegister);
clientRoutes.delete('/client/delete/:id', clienteDelete);
clientRoutes.get('/client/getAll', clientGetAll);
clientRoutes.get('/client/listName', listName);
clientRoutes.put('/client/edit', editClient);

export default clientRoutes;
