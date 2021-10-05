const { clientCharges } = require('../controllers/charges/getAll');
const homeInfo = require('../controllers/charges/homeInfo');
const { postCharge } = require('../controllers/charges/postCharge');

const chargesRoutes = require('express').Router();

chargesRoutes.get('/charges/getAll', clientCharges);
chargesRoutes.get('/charges/homeInfo', homeInfo);
chargesRoutes.post('/charges/newCharge', postCharge);

module.exports = chargesRoutes;
