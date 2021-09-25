const express = require('express');
const { test } = require('../controllers/clients');

const router = express();

router.get('/', test);

module.exports = router;
