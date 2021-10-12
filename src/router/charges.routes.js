// const { deleteCharge } = require('../controllers/charges/delete');
const { editCharge } = require('../controllers/charges/editCharge');
const { clientCharges } = require('../controllers/charges/getAll');
const { getClientCharge } = require('../controllers/charges/getClientCharge');
const homeInfo = require('../controllers/charges/homeInfo');
const { postCharge } = require('../controllers/charges/postCharge');

const chargesRoutes = require('express').Router();

chargesRoutes.get('/charges/getAll', clientCharges);
chargesRoutes.get('/charges/homeInfo', homeInfo);
chargesRoutes.get('/charges/getCharge', getClientCharge);
chargesRoutes.post('/charges/newCharge', postCharge);
chargesRoutes.put('/charges/editCharge', editCharge);
// chargesRoutes.delete('/charges/delete', deleteCharge);

module.exports = chargesRoutes;
