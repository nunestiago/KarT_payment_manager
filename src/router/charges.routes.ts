import deleteCharge from '../controllers/charges/delete';
import editCharge from '../controllers/charges/editCharge';
import clientCharges from '../controllers/charges/getAll';
import getClientCharge from '../controllers/charges/getClientCharge';
import homeInfo from '../controllers/charges/homeInfo';
import postCharge from '../controllers/charges/postCharge';
import express from 'express';

const chargesRoutes = express.Router();

chargesRoutes.get('/charges/getAll', clientCharges);
chargesRoutes.get('/charges/homeInfo', homeInfo);
chargesRoutes.get('/charges/getCharge', getClientCharge);
chargesRoutes.post('/charges/newCharge', postCharge);
chargesRoutes.put('/charges/editCharge', editCharge);
chargesRoutes.delete('/charges/delete', deleteCharge);

export default chargesRoutes;
