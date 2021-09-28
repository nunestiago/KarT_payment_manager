const router = require('express').Router();
const { clientRegister } = require('../controllers/clients');

const { userRegister, userLogin, editUser } = require('../controllers/users');
const tokenValidation = require('../middlewares/tokenValidation');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.post('/user/register', userRegister);
router.post('/user/login', userLogin);

router.use(tokenValidation);

router.put('/user/edit', editUser);
router.post('/client/register', clientRegister);

module.exports = router;
