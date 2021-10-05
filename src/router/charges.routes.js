const { clientCharges } = require('../controllers/charges/getAll');
const homeInfo = require('../controllers/charges/homeInfo');

const chargesRoutes = require('express').Router();

chargesRoutes.get('/charges/getAll', clientCharges);
chargesRoutes.get('/charges/homeInfo', homeInfo);

module.exports = chargesRoutes;
