const userRoutes = require('express').Router();

const { editUser } = require('../controllers/users/edit');
const { userRegister } = require('../controllers/users/register');
const { userLogin } = require('../controllers/users/login');
const tokenValidation = require('../middlewares/tokenValidation');

userRoutes.post('/user/register', userRegister);
userRoutes.post('/user/login', userLogin);

userRoutes.use(tokenValidation);

userRoutes.put('/user/edit', editUser);

module.exports = userRoutes;
